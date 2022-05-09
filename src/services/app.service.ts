import express, { Express } from 'express';

export let app: Express;

export function initApp(): void {
  app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const cors = require('cors');
  app.use(cors());
}

export function startApp(port: any): void {
  app.listen(port, () => {
    console.log('Server started');
  });
}
