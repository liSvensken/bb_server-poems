import { TablePoemFields } from "../../../../enums/table-poem-fields";

export interface Step1GetPoemsInterface {
	[TablePoemFields.Id]: number;
	[TablePoemFields.PoemName]: string;
	[TablePoemFields.AuthorId]: number;
	[TablePoemFields.UrlParam]: string;
	[TablePoemFields.VideoProvider]: "youtube" | "vimeo" | "vk" | "ok";
	[TablePoemFields.VideoEmbedId]: string;
	[TablePoemFields.VideoActor]: string;
	[TablePoemFields.VideoSocialYoutube]: string;
	[TablePoemFields.VideoSocialInst]: string;
	[TablePoemFields.VideoSocialVk]: string;
	[TablePoemFields.VideoSocialTelegram]: string;
	[TablePoemFields.VideoSocialTiktok]: string;
	[TablePoemFields.VideoAudio]: string;
	[TablePoemFields.ExplanationText]: string;
	[TablePoemFields.PoemText]: string;
}
