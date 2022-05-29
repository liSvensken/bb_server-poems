import { ErrorInterface } from "../../../../api/types/error.interface";
import { StepsResultInterface } from "../get-poems-list";
import { connection } from "../../../../services/db.service";
import { TablesEnum } from "../../../../enums/table.enum";
import { PoemInterface } from "../../../../interfaces/poem.interface";
import { ErrorTypes } from "../../../../api/types/error.types";

export function step2GetPoemsWithAuthor(callback: (err: ErrorInterface, statusCode: number, nowStepsResults: any) => void,
																				stepsResults: StepsResultInterface) {

	const poemsList: PoemInterface[] = [];

	stepsResults.step1GetPoems.forEach((poemItem, index) => {
		connection.query(`SELECT * FROM poems.${ TablesEnum.AuthorNames } WHERE id=${ poemItem.authorName }`,
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
}
