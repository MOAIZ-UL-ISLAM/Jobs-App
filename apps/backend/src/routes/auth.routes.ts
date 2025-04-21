// src/routes/auth.routes.ts
import { Router, Response } from 'express';
import {
    register,
    login,
    forgotPassword,
    verifyOTP,
    resetPassword,
    getDistricts
} from '../controllers/auth.controller';
import {
    validateRegistration,
    validateLogin,
    validateEmail,
    validateOTP,
    validateResetPassword
} from '../middleware/validation.middleware';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/forgot-password', validateEmail, forgotPassword);
router.post('/verify-otp', validateOTP, verifyOTP);
router.post('/reset-password', validateResetPassword, resetPassword);
router.get('/districts', getDistricts);

// Protected routes
router.get('/profile', authenticate, (req: AuthRequest, res: Response): void => {
    res.status(200).json({ user: req.user });
});


export default router;