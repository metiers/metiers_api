import path from 'path';
import fs from 'fs';
import schema from './schema';
import { db } from '../';

export const createDb = () => {
  try {
    const dbSchema = schema();
    db.query(dbSchema, (err) => {
      if (err) {
        console.log(err);
      }
    })
  } catch (err) {
    throw err;
  }
};
