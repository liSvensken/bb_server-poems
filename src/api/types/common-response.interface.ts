import { ErrorInterface } from "./error.interface";


export interface CommonResponse {
  result?: [];
  token: string;
  error?: ErrorInterface;
  totalItems?: number;
}
