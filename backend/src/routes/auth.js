import express from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import { signupValidation, loginValidation, handleValidationErrors } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signupValidation, handleValidationErrors, signup);
router.post('/login', loginValidation, handleValidationErrors, login);
router.get('/me', authenticate, getMe);

export default router;
