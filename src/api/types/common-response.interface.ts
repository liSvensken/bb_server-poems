import { ErrorInterface } from "./error.interface";


export interface CommonResponse {
  result?: [];
  error?: ErrorInterface;
  totalItems?: number;
}
