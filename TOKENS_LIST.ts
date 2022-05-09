import { GetUserByToken } from './src/controllers/common/interfaces/get-user-by-token-response';

export type TokensSecretInterface = {
  [key: string]: GetUserByToken;
}

export const TOKENS_LIST: TokensSecretInterface = {};

