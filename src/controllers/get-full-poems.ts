import { Request, Response } from 'express';
import { getPoemsList } from "./common/get-poems-list/get-poems-list";

export function getFullPoems(req: Request, res: Response) {
	const offset: number = JSON.parse(req.params.offset);

	getPoemsList(offset, 100, res, null, null);
}
