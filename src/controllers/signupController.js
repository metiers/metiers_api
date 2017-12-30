import { db } from '../database/index.js';
import bcrypt from 'bcrypt';

export default {
  signup: (req, res) => {
    console.log('req', req.body);
    const data = req.body;
    var hash = bcrypt.hashSync(data.password.trim(), 10);

    const user = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      password: hash,
     };

    let sql = `INSERT INTO User (email, firstName, lastName, password) VALUES ('${user.email}', '${user.firstName}', '${user.lastName}', '${user.password}');` 
    console.log('sql: ', sql);
     
    db.query(sql, (err, data) => {
        if (err) {
          res.status(400).send('Cannot insert into DB');
        } else {
          console.log('YAY SEND BACK 200 FROM SERVER');
          res.status(200).send(data);
        }
      })
  }
}