import { Request, Response } from 'express';
import { StepIterInterface } from "../utils/steps-iteration/interfaces/step-iter.interface";
import { step1GetPoems } from "./common/get-poems-list/steps/step-1-get-poems";
import { step2GetPoemsWithAuthor } from "./common/get-poems-list/steps/step-2-get-poems-with-author";
import { stepsIteration } from "../utils/steps-iteration/steps-iteration";
import { Step1GetPoemsInterface } from "./common/get-poems-list/interfaces/step1GetPoemsInterface";
import { PoemInterface } from "../interfaces/poem.interface";

export interface StepsResultInterface {
	step1GetPoems: Step1GetPoemsInterface[],
	step2GetPoemsWithAuthor: PoemInterface[]
}

export function getPoemsItem(req: Request, res: Response) {
	const poemUrl: string = req.params.url;

	const stepsIter: StepIterInterface[] = [
		{ fn: step1GetPoems, params: [0, 1, null, null, poemUrl, null] },
		{ fn: step2GetPoemsWithAuthor, params: [], last: true }
	]

	const stepsResults: StepsResultInterface = {
		step1GetPoems: null,
		step2GetPoemsWithAuthor: null
	}

	stepsIteration(stepsIter, res, stepsResults);
}
