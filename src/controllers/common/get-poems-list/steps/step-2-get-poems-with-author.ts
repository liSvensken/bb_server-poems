import { ErrorInterface } from "../../../../api/types/error.interface";
import { connection } from "../../../../services/db.service";
import { TablesEnum } from "../../../../enums/table.enum";
import { PoemInterface } from "../../../../interfaces/poem.interface";
import { ErrorTypes } from "../../../../api/types/error.types";
import { StepsResultInterface } from "../../../get-poems-list";
import { AuthorNameInterface } from "../../../../interfaces/author-name.interface";
import { TablePoemFields } from "../../../../enums/table-poem-fields";

export function step2GetPoemsWithAuthor(callback: (err: ErrorInterface, statusCode: number, nowStepsResults: any) => void,
																				stepsResults: StepsResultInterface) {

	const poemsList: PoemInterface[] = [];

	if (stepsResults.step1GetPoems.length) {
		stepsResults.step1GetPoems.forEach((poemItem, index) => {

			connection.query(`SELECT * FROM poems.${ TablesEnum.Authors } WHERE id=${ poemItem.authorId }`,
				(err, result) => {
					if (!err) {
						poemsList.push({
							id: poemItem[TablePoemFields.Id],
							poemName: poemItem[TablePoemFields.PoemName],
							authorName: result[0] as AuthorNameInterface,
							urlParam: poemItem[TablePoemFields.UrlParam],
							video: {
								provider: poemItem[TablePoemFields.VideoProvider],
								embedId: poemItem[TablePoemFields.VideoEmbedId],
								actor: poemItem[TablePoemFields.VideoActor],
								social: {
									youtube: poemItem[TablePoemFields.VideoSocialYoutube],
									inst: poemItem[TablePoemFields.VideoSocialInst],
									vk: poemItem[TablePoemFields.VideoSocialVk],
									telegram: poemItem[TablePoemFields.VideoSocialTelegram],
									tiktok: poemItem[TablePoemFields.VideoSocialTiktok],
								},
								audio: poemItem[TablePoemFields.VideoAudio]
							},
							explanationText: JSON.parse(poemItem[TablePoemFields.ExplanationText]),
							poemText: poemItem[TablePoemFields.PoemText]
						} as PoemInterface)


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
