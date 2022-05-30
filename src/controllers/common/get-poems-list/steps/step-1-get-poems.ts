import { connection } from "../../../../services/db.service";
import { TablesEnum } from "../../../../enums/table.enum";
import { ErrorInterface } from "../../../../api/types/error.interface";
import { ErrorTypes } from "../../../../api/types/error.types";
import { StepsResultInterface } from "../../../get-poems-list";
import { TablePoemFields } from "../../../../enums/table-poem-fields";

export function step1GetPoems(callback: (err: ErrorInterface, statusCode: number, nowStepsResults: any) => void,
															offset: number, limit: number, authorId: number, grad: number, poemUrl: string, stepsResults: StepsResultInterface) {

	let additionalConditions = "";

	const addConditionString = (fieldName: TablePoemFields, newCondition: string | number | null) => {
		if (newCondition) {
			if (typeof newCondition === "string") {
				newCondition = `'${ newCondition }'`;
			}
			const conditionStr = `${ fieldName } = ${ newCondition }`;

			additionalConditions += !additionalConditions ? `WHERE ${ conditionStr }` : `AND ${ conditionStr }`;
		}
	}

	addConditionString(TablePoemFields.AuthorId, authorId);
	addConditionString(TablePoemFields.Grad, grad);
	addConditionString(TablePoemFields.UrlParam, poemUrl);

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
