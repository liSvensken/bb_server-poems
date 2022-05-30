import { ErrorInterface } from "../../../api/types/error.interface";
import { StepsResultInterface } from "../get-authors-list";
import { connection } from "../../../services/db.service";
import { TablesEnum } from "../../../enums/table.enum";
import { ErrorTypes } from "../../../api/types/error.types";


export function step1GetAuthorsList(callback: (err: ErrorInterface, statusCode: number, nowStepsResults: any) => void,
															offset: number, limit: number, stepsResults: StepsResultInterface) {

	connection.query(
		`SELECT * FROM poems.${ TablesEnum.Authors } LIMIT ${ offset }, ${ limit }`,
		(err, result) => {
			if (!err) {
				stepsResults.step1GetAuthorsList = result;
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
