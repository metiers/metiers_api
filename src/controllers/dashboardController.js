import { db } from '../database/index.js';
import dashboardGet from './helper/dashboardGet';

export default {
  dashboard: (req, res) => {
    let sql = dashboardGet(parseInt(req.userInfo.id));
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