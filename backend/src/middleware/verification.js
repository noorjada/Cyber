import { findUserById } from '../models/user.js';

export const requireVerified = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        const user = await findUserById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (!user.is_verified) {
            return res.status(403).json({
                success: false,
                message: 'Please verify your account first',
                needsVerification: true
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error checking verification status'
        });
    }
};
