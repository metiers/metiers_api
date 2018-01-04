import { db } from '../database/index.js';
import editJob from './helper/editJobInfo';
import editCompany from './helper/editCompanyInfo';

export default {
  editInfo: (req, res) => {
    const data = req.body
    let sql;

    sql = editJob(data.job);
    db.query(sql, (err) => {
      if (err) throw err;

      sql = editCompany(data.company)
      db.query(sql, (err) => {
        if (err) throw err;
      })
    })

    db.query(`INSERT INTO history (jobId, name, timeStamp) VALUES (${data.job.jobId}, 'Edited Job Info', CURRENT_TIMESTAMP());`, (err) => {
      if (err) throw err;
    })
  }
}