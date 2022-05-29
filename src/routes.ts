import { Request, Response } from 'express';
import { app } from './services/app.service';
import { getPoemsList } from "./controllers/get-poems-list";

export function initRoutesPoems(): void {

  /** получить все стихи */
  app.post('/poems', (req: Request, res: Response) => {
    getPoemsList(req, res);
  });
}
