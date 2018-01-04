import { db } from '../database/index.js';
import addNotificationPost from './helper/addNotificationPost';

export default {
  notification: (req, res) => {
    let body = req.body;
    console.log('body: ', body)
    let sql = addNotificationPost(parseInt(body.jobId), body.NotificationName, body.NotificationMessage, body.NotificationDateTime);
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
