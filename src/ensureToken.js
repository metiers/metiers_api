import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import secret from './config'

const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if(typeof bearerHeader !== 'undefined') {  
    const bearer = bearerHeader.split(" ");
    console.log('bearer', bearer);
    const bearerToken = bearer[1];        
    req.token = bearerToken;
    jwt.verify(req.token, secret.jwtSecret, function(err, data) {
      console.log('req.token', req.token);
      console.log('secret.jwt', secret.jwtSecret);
      console.log('err', err);
      console.log('data', data);
      if(err) {
        res.sendStatus(401).json({ error: 'Failed to Authenticate'});
        console.log('Failed to Authenticate');
      } else {
        //This shouldn't query DB without correct headers 
        next();   
      }  
    });   
  } else {
    res.sendStatus(403).json({ error: 'No token provided' });
    return;
    console.log('No token provided');
  }
}

export default ensureToken;