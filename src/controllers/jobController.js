import { db } from '../database/index.js';
import helper from './helper';

export default {
  manual: (req, res) => {
    const data = req.body
    console.log('mybodyreq.body')
    console.log(data)
    let sql;

    data.company.userId = parseInt(data.id);
    sql = helper.insert('company', data.company);
    db.query(sql, (err, company) => {
      if (err) throw err;

      data.job.userId = parseInt(data.id);
      data.job.companyId = company.insertId;
      sql = helper.insert('job', data.job);
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