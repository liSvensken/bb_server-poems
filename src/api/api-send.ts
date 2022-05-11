import { Response } from 'express';
import { CommonResponse } from "./types/common-response.interface";
import { ErrorInterface } from "./types/error.interface";

export function apiSend(res: Response, statusCode: number, result: any = null, err: ErrorInterface = null,
                        totalItems?: number): void {
  const response: CommonResponse = {
    result: null,
    error: null,
    totalItems: null,
    token: null,
  };

  response.result = result;
  response.error = err;
  response.totalItems = totalItems;
  res.status(statusCode);
  res.json(response);

  console.log('_____')
  console.log(response)
  console.log('_____')
}
