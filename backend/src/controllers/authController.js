import {
    createUser,
    createUserProgress,
    findUserByEmail,
    findUserById,
    findUserByVerificationToken,
    updateVerificationToken,
    verifyUser
} from '../models/user.js';
import { sendResendVerificationEmail, sendVerificationEmail } from '../utils/email.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { generateToken } from '../utils/token.js';
import { generateVerificationToken, generateVerificationTokenExpiry } from '../utils/verification.js';

export const signup = async (req, res, next) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        
        // Combine firstName and lastName if username not provided
        const finalUsername = username || (firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || 'user');

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        const hashedPassword = await hashPassword(password);
        const verificationToken = generateVerificationToken();
        const verificationTokenExpires = generateVerificationTokenExpiry();

        const user = await createUser(finalUsername, email, hashedPassword, verificationToken, verificationTokenExpires);

        // Send verification email
        try {
            await sendVerificationEmail(email, verificationToken);
        } catch (emailError) {
            console.error('Failed to send verification email:', emailError);
            // Don't fail signup if email fails, but log it
        }

        // Create user progress record
        await createUserProgress(user.id);

        res.status(201).json({
            success: true,
            message: 'Account created! Please verify your email to continue.',
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    is_verified: user.is_verified,
                    created_at: user.created_at
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if user is verified
        if (!user.is_verified) {
            return res.status(403).json({
                success: false,
                message: 'Please verify your account first. Check your email for the verification link.',
                needsVerification: true,
                userId: user.id,
                email: user.email
            });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    is_verified: user.is_verified,
                    created_at: user.created_at
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

export const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Verification token is required'
            });
        }

        const user = await findUserByVerificationToken(token);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification token'
            });
        }

        if (user.is_verified) {
            return res.status(400).json({
                success: false,
                message: 'Email already verified'
            });
        }

        const verifiedUser = await verifyUser(user.id);
        const authToken = generateToken(verifiedUser);

        res.status(200).json({
            success: true,
            message: 'Email verified successfully! You can now log in.',
            data: {
                user: {
                    id: verifiedUser.id,
                    username: verifiedUser.username,
                    email: verifiedUser.email,
                    is_verified: verifiedUser.is_verified,
                    created_at: verifiedUser.created_at
                },
                token: authToken
            }
        });
    } catch (error) {
        next(error);
    }
};

export const resendVerificationEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.is_verified) {
            return res.status(400).json({
                success: false,
                message: 'Email is already verified'
            });
        }

        const verificationToken = generateVerificationToken();
        const verificationTokenExpires = generateVerificationTokenExpiry();

        await updateVerificationToken(email, verificationToken, verificationTokenExpires);

        // Send verification email
        try {
            await sendResendVerificationEmail(email, verificationToken);
        } catch (emailError) {
            console.error('Failed to send verification email:', emailError);
            return res.status(500).json({
                success: false,
                message: 'Failed to send verification email. Please try again.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Verification email sent successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = await findUserById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: { user }
        });
    } catch (error) {
        next(error);
    }
};
