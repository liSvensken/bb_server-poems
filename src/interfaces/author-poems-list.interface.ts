import { AuthorNameInterface } from "./author-name.interface";
import { PoemInterface } from "./poem.interface";

export interface AuthorPoemsListInterface {
  authorName: AuthorNameInterface;
  poemsList: PoemInterface[]
}
