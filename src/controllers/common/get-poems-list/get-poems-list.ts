import { StepIterInterface } from "../../../utils/steps-iteration/interfaces/step-iter.interface";
import { stepsIteration } from "../../../utils/steps-iteration/steps-iteration";
import { step1GetPoems } from "./steps/step-1-get-poems";
import { Response } from "express";
import { Step1GetPoemsInterface } from "./interfaces/step1GetPoemsInterface";
import { step2GetPoemsWithAuthor } from "./steps/step-2-get-poems-with-author";
import { PoemInterface } from "../../../interfaces/poem.interface";

export interface StepsResultInterface {
	step1GetPoems: Step1GetPoemsInterface[],
	step2GetPoemsWithAuthor: PoemInterface[]
}

export function getPoemsList(offset: number, limit: number, res: Response, author?: string, idPoem?: number) {
	const stepsIter: StepIterInterface[] = [
		{ fn: step1GetPoems, params: [offset, limit, author, idPoem] },
		{ fn: step2GetPoemsWithAuthor, params: [], last: true }
	]

	const stepsResults: StepsResultInterface = {
		step1GetPoems: null,
		step2GetPoemsWithAuthor: null
	}

	stepsIteration(stepsIter, res, stepsResults);
}
