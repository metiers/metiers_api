import express from 'express';
import jobController from '../controllers/jobController';

const router = express.Router();

router.route('/signup')

router.route('/login')

router.route('/github')

router.route('/dashboard')

router.route('/manual')
  .post(jobController.manual)

router.route('/search')

router.route('/jobDetail')

export default router;
