import express from 'express';
import jobController from '../controllers/jobController';
import signupController from '../controllers/signupController';
import loginController from '../controllers/loginController';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ensureToken from '../ensureToken';

const router = express.Router();

router.route('/signup')
  .post(signupController.signup);

  router.route('/login')
  .post(loginController.login);


// router.route('/login', function(req, res) {
//   const user = {
//     id: 3
//   };
//   const token = jwt.sign({user}, 'secret');
//   res.json({
//     token: token
//   });
// });

router.route('/github')

router.route('/dashboard')

router.route('/manual')
  .post(ensureToken, jobController.manual)

router.route('/search')

router.route('/jobDetail')

export default router;
