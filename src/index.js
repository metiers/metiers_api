import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import Routes from './routes';
import { initiateDb } from './database'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ensureToken from './auth';

const app = express();

dotenv.config();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header("Access-Control-Allow-Headers", 
  "Token, UserId, Authorization, Username, Password, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', Routes);

// app.post('/api/login', function(req, res) {
//   const user = { id: 3 };
//   const token = jwt.sign({ user }, 'secret');
//   res.json({
//     token: token
//   });
// });

// app.get('/api/protected', ensureToken, function(req, res) {
//   jwt.verify(req.token, 'secret', function(err, data) {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         description: 'Protected information. Congrats!'
//       });
//     }
//   });
// });

app.listen(port, (err) => {
  console.log(`Express serving port ${port}`);
  initiateDb((err) => {
    if (err) {
      console.log('ERROR ERROR ERROR', err);
    } else {
      console.log('SYSTEM ONLINE');
    }
  })
});
