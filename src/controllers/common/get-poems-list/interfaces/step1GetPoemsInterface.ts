import { TablePoemFields } from "../../../../enums/table-poem-fields";

export interface Step1GetPoemsInterface {
	[TablePoemFields.Id]: number;
	[TablePoemFields.PoemName]: string;
	[TablePoemFields.AuthorId]: number;
	[TablePoemFields.UrlParam]: string;
}
