import { db } from '../database/index.js';
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
  }
}