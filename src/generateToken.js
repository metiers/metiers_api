import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  var currUser = {
   firstName: user.firstName,
   lastName: user.lastName,
   id: user.id.toString(),
  };
  return jwt.sign(currUser, 'secret', {
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

export default generateToken;