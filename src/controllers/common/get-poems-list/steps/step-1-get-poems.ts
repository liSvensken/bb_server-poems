import { connection } from "../../../../services/db.service";
import { TablesEnum } from "../../../../enums/table.enum";
import { ErrorInterface } from "../../../../api/types/error.interface";
import { ErrorTypes } from "../../../../api/types/error.types";
import { StepsResultInterface } from "../../../get-poems-list";
import { TablePoemFields } from "../../../../enums/table-poem-fields";

function getRandomIntInclusive(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

export function step1GetPoems(callback: (err: ErrorInterface, statusCode: number, nowStepsResults: any) => void,
															offset: number, limit: number, authorId: number, grad: number, poemUrl: string, randomCount: number, stepsResults: StepsResultInterface) {

	let additionalConditions = "";

	const addConditionString = (fieldName: TablePoemFields, newCondition: string | number | null, isOr?: boolean) => {
		if (newCondition) {
			if (typeof newCondition === "string") {
				newCondition = `'${ newCondition }'`;
			}
			const conditionStr = `${ fieldName } = ${ newCondition }`;

			additionalConditions += !additionalConditions ? `WHERE ${ conditionStr }` : ` ${ isOr ? 'OR' : 'AND' } ${ conditionStr }`;
		}
	}

	addConditionString(TablePoemFields.AuthorId, authorId);
	addConditionString(TablePoemFields.Grad, grad);
	addConditionString(TablePoemFields.UrlParam, poemUrl);

	const getPoemsFromDb = () => {
		connection.query(
			`SELECT * FROM poems.${ TablesEnum.Poems } ${ additionalConditions } LIMIT ${ offset }, ${ limit }`,
			(err, result) => {
				if (!err) {
					stepsResults.step1GetPoems = result;
					callback(null, 200, stepsResults);
				} else {
					callback(
						{
							type: ErrorTypes.NotFound,
							message: "",
							status: 404,
						}, 404, null)
				}
			});
	}

	if (!randomCount) {
		getPoemsFromDb();
	} else {
		connection.query(
			`SELECT COUNT(${ TablePoemFields.Id }) FROM poems.${ TablesEnum.Poems }`,
			(err, result) => {
				let lengthPoems = result[0][`COUNT(${ TablePoemFields.Id })`]
				const count = randomCount > lengthPoems ? lengthPoems : randomCount;

				if (!err) {
					const idsRandom: number[] = [];
					for (let i = 0; i < count; i++) {
						const addNewRandomId = () => {
							const randomId = getRandomIntInclusive(1, lengthPoems);
							if (idsRandom.includes(randomId)) {
								addNewRandomId();
							} else {
								idsRandom.push(randomId)
								addConditionString(TablePoemFields.Id, randomId, true);
							}
						};

						addNewRandomId();
					}
					getPoemsFromDb();
				} else {
					callback(
						{
							type: ErrorTypes.NotFound,
							message: "",
							status: 404,
						}, 404, null)
				}
			});
	}
}
