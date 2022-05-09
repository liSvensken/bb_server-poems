import mysql, { Connection } from 'mysql';

export let connection: Connection;

export function initConnection(): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    try {
      connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Current-Root-Password'
      });

      connection.connect(((err: string) => {
        if (!err) {
          console.log('DB connected');
          resolve();
        } else {
          reject(err);
        }
      }));
    } catch (err) {
      reject(err);
    }
  });
}
