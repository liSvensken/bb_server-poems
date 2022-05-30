import { Request, Response } from 'express';
import { StepIterInterface } from "../../utils/steps-iteration/interfaces/step-iter.interface";
import { stepsIteration } from "../../utils/steps-iteration/steps-iteration";
import { step1GetAuthorsList } from "./steps/step-1-get-authors-list";
import { AuthorPoemsListInterface } from "../../interfaces/author-poems-list.interface";
import { AuthorNameInterface } from "../../interfaces/author-name.interface";
import { step2GetPoemsByAuthor } from "./steps/step-2-get-poems-by-author";

interface bodyRequest {
	limit: number;
	offset: number;
}

export interface StepsResultInterface {
	step1GetAuthorsList: AuthorNameInterface[],
	step2GetPoemsByAuthor: AuthorPoemsListInterface[]
}

export function getAuthorList(req: Request, res: Response) {
	const reqBody: bodyRequest = req.body;

	const stepsIter: StepIterInterface[] = [
		{ fn: step1GetAuthorsList, params: [reqBody.offset, reqBody.limit, null, null, null, null] },
		{ fn: step2GetPoemsByAuthor, params: [], last: true }
	]

	const stepsResults: StepsResultInterface = {
		step1GetAuthorsList: null,
		step2GetPoemsByAuthor: null,
	}

	stepsIteration(stepsIter, res, stepsResults);
}
