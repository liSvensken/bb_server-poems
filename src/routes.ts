import { Request, Response } from 'express';
import { app } from './services/app.service';
import { getFullPoems } from "./controllers/get-full-poems";

export function initRoutesPoems(): void {

  /** получить все стихи */
  app.get('/poems/:offset', (req: Request, res: Response) => {
    getFullPoems(req, res);
  });
}
