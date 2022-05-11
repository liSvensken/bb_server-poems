import { Request, Response } from 'express';
import { connection } from "../../services/db.service";
import { TablesEnum } from "../../enums/table.enum";
import { apiSend } from "../../api/api-send";

const LIMIT = 100;

export function getFullPoems(req: Request, res: Response) {
	const offset: number = JSON.parse(req.params.offset);

	connection.query(`SELECT * FROM poems.${ TablesEnum.Poems } LIMIT ${ offset }, ${ LIMIT }`,
		(err, result) => {
			console.log(result)

			apiSend(res, result ? 200 : 500, result, null);
		});
}
