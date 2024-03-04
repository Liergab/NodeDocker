import bcrypt from 'bcrypt';

export const generateHashedPassword = async(password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error generating hashed password');
    }
}

export const comparedPassword = async(plain, hashPassword) => {
        return await bcrypt.compare(plain, hashPassword);
}

