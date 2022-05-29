import { ErrorInterface } from "../../../../api/types/error.interface";
import { connection } from "../../../../services/db.service";
import { TablesEnum } from "../../../../enums/table.enum";
import { PoemInterface } from "../../../../interfaces/poem.interface";
import { ErrorTypes } from "../../../../api/types/error.types";
import { StepsResultInterface } from "../../../get-poems-list";

export function step2GetPoemsWithAuthor(callback: (err: ErrorInterface, statusCode: number, nowStepsResults: any) => void,
																				stepsResults: StepsResultInterface) {

	const poemsList: PoemInterface[] = [];

	if (stepsResults.step1GetPoems.length) {
		stepsResults.step1GetPoems.forEach((poemItem, index) => {

			connection.query(`SELECT * FROM poems.${ TablesEnum.Authors } WHERE id=${ poemItem.authorId }`,
				(err, result) => {
					if (!err) {
						poemsList.push({
							...poemItem,
							authorName: result[0]
						})

						if (index === stepsResults.step1GetPoems.length - 1) {
							stepsResults.step2GetPoemsWithAuthor = poemsList;
							callback(null, 200, stepsResults.step2GetPoemsWithAuthor);
						}
					} else {
						callback(
							{
								type: ErrorTypes.NotFound,
								message: "",
								status: 404,
							}, 404, null)
					}
				});
		})
	} else {
		callback(null, 200, []);
	}
}
