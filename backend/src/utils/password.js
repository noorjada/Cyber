import bcrypt from 'bcrypt';

const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
const pepper = process.env.BCRYPT_PASSWORD || '';

export const hashPassword = async (password) => {
    const pepperedPassword = password + pepper;
    return await bcrypt.hash(pepperedPassword, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
    const pepperedPassword = password + pepper;
    return await bcrypt.compare(pepperedPassword, hashedPassword);
};
