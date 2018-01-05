import express from 'express';
import jobController from '../controllers/jobController';
import signupController from '../controllers/signupController';
import loginController from '../controllers/loginController';
import dashboardController from '../controllers/dashboardController';
import jobDetailController from '../controllers/jobDetailController';
import searchController from '../controllers/searchController';
import activityLogController from '../controllers/activityLogController';
import addNotificationController from '../controllers/addNotificationController';
import getNotificationsController from '../controllers/getNotificationsController';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ensureToken from '../ensureToken';

const router = express.Router();

router.route('/signup')
  .post(signupController.signup);

  router.route('/login')
  .post(loginController.login);

router.route('/github')
  .post(searchController.githubPost);

router.route('/dashboard')
  .post(ensureToken, dashboardController.dashboard);

router.route('/addNotification')
  .post(ensureToken, addNotificationController.notification)

router.route('/getNotifications')
  .post(ensureToken, getNotificationsController.notification)

router.route('/manual')
  .post(ensureToken, jobController.manual);

router.route('/company/search')
  .post(searchController.companySearchPost);

router.route('/job/search')
  .post(searchController.jobSearchPost);

router.route('/jobDetail')
  .post(ensureToken, jobDetailController.jobdetail);

router.route('/historyLog')
  .post(activityLogController.activityLog);

router.route('/addHistory')
  .post(activityLogController.activityLogPost);

router.route('/editNotes')
  .post(ensureToken, jobDetailController.editNotes)

router.route('/editJobInfo')
  .post(ensureToken, jobDetailController.editInfo)

export default router;
