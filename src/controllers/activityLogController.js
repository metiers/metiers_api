import { db } from '../database/index.js';

export default {
  activityLog: (req, res) => {
    console.log('this is history job id', req.body.job_id);
    const sql = `SELECT * from History WHERE jobId = ${req.body.job_id}`;
    db.query(sql, (err, results) => {
      res.json(results);   
    });
  },
  activityLogPost: (req, res) => {
    const dateTime = req.body.timeStamp.split('T').join(' ').split('.')[0];
    const sql = `
      INSERT INTO History (jobId, name, timeStamp)
      VALUES (${req.body.job_id}, '${req.body.name}', '${dateTime}')
      `;
    db.query(sql, (err, results) => {
      res.send('saved history into db');
    });
  },
};

