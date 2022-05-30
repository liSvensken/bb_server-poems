import { ErrorInterface } from "../../../api/types/error.interface";
import { StepsResultInterface } from "../get-authors-list";
import { connection } from "../../../services/db.service";
import { TablesEnum } from "../../../enums/table.enum";
import { ErrorTypes } from "../../../api/types/error.types";
import { AuthorPoemsListInterface } from "../../../interfaces/author-poems-list.interface";
import { TableAuthorsFields } from "../../../enums/table-authors-fields";
import { TablePoemFields } from "../../../enums/table-poem-fields";


export function step2GetPoemsByAuthor(callback: (err: ErrorInterface, statusCode: number, nowStepsResults: any) => void,
															stepsResults: StepsResultInterface) {

	const authorAndPoems: AuthorPoemsListInterface[] = [];

	stepsResults.step1GetAuthorsList.forEach((authorItem, index) => {
		connection.query(
			`SELECT * FROM poems.${ TablesEnum.Poems } WHERE ${TablePoemFields.AuthorId} = ${ authorItem[TableAuthorsFields.Id] }`,
			(err, result) => {
				if (!err) {
					authorAndPoems.push({
						authorName: authorItem,
						poemsList: result
					})

					if (index === stepsResults.step1GetAuthorsList.length - 1) {
						stepsResults.step2GetPoemsByAuthor = authorAndPoems;
						callback(null, 200, stepsResults.step2GetPoemsByAuthor);
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
