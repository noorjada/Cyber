import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const generateToken = (user) => {
    return jwt.sign(
        { 
            userId: user.id, 
            email: user.email,
            username: user.username 
        },
        TOKEN_SECRET,
        { expiresIn: '24h' }
    );
};

export const verifyToken = (token) => {
    return jwt.verify(token, TOKEN_SECRET);
};
