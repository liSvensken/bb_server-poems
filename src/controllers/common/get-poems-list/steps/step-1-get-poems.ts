import { connection } from "../../../../services/db.service";
import { TablesEnum } from "../../../../enums/table.enum";
import { ErrorInterface } from "../../../../api/types/error.interface";
import { StepsResultInterface } from "../get-poems-list";
import { ErrorTypes } from "../../../../api/types/error.types";

export function step1GetPoems(callback: (err: ErrorInterface, statusCode: number, nowStepsResults: any) => void,
															offset: number, limit: number, author: string, idPoem: number, stepsResults: StepsResultInterface) {

	let additionalConditions = "";

	const addConditionString = (newCondition: string | number | null) => {
		if (newCondition) {
			additionalConditions += !additionalConditions ? `WHERE ${ newCondition }` : `AND ${ newCondition }`;
		}
	}

	addConditionString(author);
	addConditionString(idPoem);

	connection.query(
		`SELECT * FROM poems.${ TablesEnum.Poems } LIMIT ${ offset }, ${ limit } ${ additionalConditions }`,
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
