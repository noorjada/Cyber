import crypto from 'crypto';

export const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

export const generateVerificationTokenExpiry = (hours = 24) => {
    const now = new Date();
    now.setHours(now.getHours() + hours);
    return now;
};
