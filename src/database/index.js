import mysql from 'mysql2';
import { createDb } from './init';
export let db;  

export const initiateDb = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    multipleStatements: true,
  });
  connection.connect((err) => {
    if (err) {
      throw err;
    } else {
      db = connection;
      createDb();
    }
  });
}