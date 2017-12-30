// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// const ensureToken = (req, res, next) => {
//   const bearerHeader = req.headers["authorization"];
//   if(typeof bearerHeader !== 'undefined') {  
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];        
//     req.token = bearerToken;
//     jwt.verify(req.token, 'secret', function(err, data) {
//       if(err) {
//         res.sendStatus(403);
//       } else {
//         next();   
//       }  
//     });   
//   } else {
//     res.sendStatus(403);
//   }
// }

// export default ensureToken;