import pool from '../config/database.js';

export const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
};

export const findUserById = async (id) => {
    const query = 'SELECT id, username, email, is_verified, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

export const findUserByVerificationToken = async (token) => {
    const query = 'SELECT * FROM users WHERE verification_token = $1 AND verification_token_expires_at > NOW()';
    const result = await pool.query(query, [token]);
    return result.rows[0];
};

export const createUser = async (username, email, hashedPassword, verificationToken, verificationTokenExpires) => {
    const query = `
        INSERT INTO users (username, email, password, is_verified, verification_token, verification_token_expires_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, username, email, is_verified, created_at
    `;
    const values = [username, email, hashedPassword, false, verificationToken, verificationTokenExpires];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const verifyUser = async (userId) => {
    const query = `
        UPDATE users 
        SET is_verified = TRUE, verification_token = NULL, verification_token_expires_at = NULL, updated_at = NOW()
        WHERE id = $1
        RETURNING id, username, email, is_verified, created_at
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
};

export const updateVerificationToken = async (email, verificationToken, verificationTokenExpires) => {
    const query = `
        UPDATE users 
        SET verification_token = $1, verification_token_expires_at = $2, updated_at = NOW()
        WHERE email = $3
        RETURNING id, username, email, is_verified
    `;
    const result = await pool.query(query, [verificationToken, verificationTokenExpires, email]);
    return result.rows[0];
};

export const getUserProgress = async (userId) => {
    const query = 'SELECT * FROM user_progress WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows[0];
};

export const createUserProgress = async (userId) => {
    const query = `
        INSERT INTO user_progress (user_id, challenges_completed, total_xp, level)
        VALUES ($1, 0, 0, 1)
        RETURNING *
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
};

export const getChallenges = async (limit = 10, offset = 0) => {
    const query = `
        SELECT * FROM challenges 
        ORDER BY created_at DESC 
        LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
};

export const getUserActivity = async (userId, limit = 10) => {
    const query = `
        SELECT * FROM activity_log 
        WHERE user_id = $1 
        ORDER BY created_at DESC 
        LIMIT $2
    `;
    const result = await pool.query(query, [userId, limit]);
    return result.rows;
};

export const logActivity = async (userId, action, details) => {
    const query = `
        INSERT INTO activity_log (user_id, action, details)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const result = await pool.query(query, [userId, action, details]);
    return result.rows[0];
};
