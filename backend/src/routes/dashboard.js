import express from 'express';
import { getDashboard, getUserDashboard } from '../controllers/dashboardController.js';
import { authenticate } from '../middleware/auth.js';
import { requireVerified } from '../middleware/verification.js';

const router = express.Router();

// All dashboard routes require authentication and verification
router.use(authenticate);
router.use(requireVerified);

router.get('/', getDashboard);
router.get('/stats', getUserDashboard);

export default router;
