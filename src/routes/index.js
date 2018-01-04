import express from 'express';
import jobController from '../controllers/jobController';
import signupController from '../controllers/signupController';
import loginController from '../controllers/loginController';
import dashboardController from '../controllers/dashboardController';
import jobDetailController from '../controllers/jobDetailController';
import searchController from '../controllers/searchController';
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
  .post(ensureToken, searchController.githubPost);

router.route('/dashboard')
  .post(ensureToken, dashboardController.dashboard)

router.route('/manual')
  .post(ensureToken, jobController.manual)

router.route('company/search')
  .post(ensureToken, searchController.companySearchPost);

router.route('job/search')
  .post(ensureToken, );

router.route('/jobDetail')
  .post(ensureToken, jobDetailController.jobdetail)

export default router;
