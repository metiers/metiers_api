import { db } from '../database/index.js';

export default {
  notification: (req, res) => {
    let body = req.body;
    let sql = `SELECT * from notification where notifyOn = CURDATE() AND userId = '${parseInt(req.userInfo.id)};`
    db.query(sql, (err, data) => {
      if (err) {
        res.status(400).send('Cannot get from DB');
        return;
      } else {
        console.log('YAY SEND BACK 200 FROM SERVER');
        res.status(200).send(data);
        return;
      }
    }) 
  }
}
