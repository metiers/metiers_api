import { db } from '../database/index.js';
import editJob from './helper/editJobInfo';
import editCompany from './helper/editCompanyInfo';
import jobDetailGet from './helper/jobDetailGet';

export default {
  jobdetail: (req, res) => {
    let sql = jobDetailGet(parseInt(req.body.jobId));
    db.query(sql, (err, data) => {
      if (err) {
        res.status(400).send('Cannot insert into DB');
        return;
      } else {
        console.log('YAY SEND BACK 200 FROM SERVER');
        res.status(200).send(data);
        return;
      }
    }) 
  },
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
  },
  editNotes: (req, res) => {
    const data = req.body

    db.query(`UPDATE job SET notes='${data.jobNotes}' WHERE id=${data.jobId}`, (err) => {
      if (err) throw err;
    })

    db.query(`INSERT INTO history (jobId, name, timeStamp) VALUES (${data.jobId}, 'Edited Notes', CURRENT_TIMESTAMP());`, (err) => {
      if (err) throw err;
    })
  }
}