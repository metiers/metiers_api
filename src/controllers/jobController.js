import { db } from '../database/index.js';
import helper from './helper';

export default {
  manual: (req, res) => {
    const data = req.body
    let sql;

    data.company.userId = 1;
    sql = helper.insert('company', data.company);
    console.log(sql)
    db.query(sql, (err, company) => {
      if (err) throw err;
      console.log(company.insertId)
      data.job.userId = 1;
      data.job.companyId = company.insertId;
      // data.job.createdAt = 'CURRENT_TIMESTAMP()';
      sql = helper.insert('job', data.job);
      console.log(sql)
      db.query(sql, (err, data) => {
        if (err) {
          res.status(400).send('Cannot insert into DB');
        } else {
          res.status(200).send(data);
        }
      })
    })
  }
}