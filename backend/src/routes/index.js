import express from 'express';
import authRoutes from './auth.js';
import dashboardRoutes from './dashboard.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);

router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

export default router;
