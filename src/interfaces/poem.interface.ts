import { AuthorNameInterface } from "./author-name.interface";

export interface PoemInterface {
  id: number;
  poemName: string;
  authorName: AuthorNameInterface;
  urlParam: string;
  video: {
    provider: "youtube" | "vimeo" | "vk" | "ok";
    embedId: string;
    actor: string;
    social: {
      youtube?: string;
      inst?: string;
      vk?: string;
      telegram?: string;
      tiktok?: string;
    },
    audio?: string;
  },
  explanationText: string[];
  poemText: string;
}
