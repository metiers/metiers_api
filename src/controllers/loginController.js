import { db } from '../database/index.js';
import bcrypt from 'bcrypt';

export default {
  login: (req, res) => {
    console.log('req', req.body);
    const data = req.body;
    
    //Check DB for the email address. If so bring back everything
    let sql = `SELECT * FROM User WHERE email = '${req.body.email}';`
    db.query(sql, (err, data) => {
      if (err) {
        res.status(400).send('Cannot insert into DB');
      } else {
        // console.log('FOUND THE EMAIL! HERE CHECK', data[0].email);
        if(data.length === 0 || data[0].email === undefined){
          console.log('couldnt find any');
          res.status(401).send();
        } else {
          res.status(200).send(data);
        }
      }
    })

  //   let sql = `INSERT INTO User (email, firstName, lastName, password) VALUES ('${user.email}', '${user.firstName}', '${user.lastName}', '${user.password}');` 
  //   console.log('sql: ', sql);
     
  //   db.query(sql, (err, data) => {
  //       if (err) {
  //         res.status(400).send('Cannot insert into DB');
  //       } else {
  //         console.log('YAY SEND BACK 200 FROM SERVER');
  //         res.status(200).send(data);
  //       }
  //     })
   }
}