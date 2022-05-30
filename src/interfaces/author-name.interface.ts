import { TableAuthorsFields } from "../enums/table-authors-fields";

export interface AuthorNameInterface {
  [TableAuthorsFields.Id]: number;
  [TableAuthorsFields.FirstName]: string;
  [TableAuthorsFields.Name]: number;
  [TableAuthorsFields.Patronymic]: string;
}
