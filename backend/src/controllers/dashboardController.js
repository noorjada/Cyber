import { getChallenges, getUserActivity, getUserProgress } from '../models/user.js';

export const getDashboard = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const progress = await getUserProgress(userId);
        const challenges = await getChallenges(20, 0);
        const recentActivity = await getUserActivity(userId, 10);

        res.status(200).json({
            success: true,
            data: {
                progress,
                challenges,
                recentActivity
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getUserDashboard = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const progress = await getUserProgress(userId);

        res.status(200).json({
            success: true,
            data: {
                progress
            }
        });
    } catch (error) {
        next(error);
    }
};
