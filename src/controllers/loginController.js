import { db } from '../database/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateToken from '../generateToken';

export default {
  login: (req, res) => {
    console.log('req', req.body);
    const body = req.body;
    
    //Check DB for the email address. If so bring back everything
    let sql = `SELECT * FROM User WHERE email = '${body.email}';`
    db.query(sql, (err, data) => {
      if (err) {
        res.status(400).send('Cannot insert into DB');
      } else {
        //Email entered is not in DB
        if(data.length === 0 || data[0].email === undefined){
          console.log('couldnt find any');
          res.status(401).send();
        } 
        //Password entered does not match
        else {
          if( data[0].password !== undefined ){
            console.log('data:', data[0]);
            //check passwords 
            bcrypt.compare(body.password, data[0].password,        
              function(err, valid) {
                if (!valid) {
                  return res.status(401).json({
                          error: true,
                          message: 'Username or Password is incorrect.'
                  });
                }
              //generate token
              var token = generateToken(data[0]);
              res.json({
                token: token
              });
            });
          }
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