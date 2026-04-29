import express from 'express';
import { getMe, login, resendVerificationEmail, signup, verifyEmail } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { handleValidationErrors, loginValidation, signupValidation } from '../middleware/validation.js';

const router = express.Router();

router.post('/signup', signupValidation, handleValidationErrors, signup);
router.post('/login', loginValidation, handleValidationErrors, login);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);
router.get('/me', authenticate, getMe);

export default router;
