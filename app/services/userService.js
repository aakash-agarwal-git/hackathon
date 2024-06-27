const User = require('../models/userModel');

const generateUserId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'H';
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    result += 'D';
    return result;
};

const getUserById = async (userId) => {
    try {
        const user = await User.findOne({ userId });
        return user;
    } catch (error) {
        throw new Error('Error while fetching user data');
    }
};

const createUser = async (mobile) => {
    const userId = generateUserId();
    const newUser = new User({ userId, mobile });
    try {
        await newUser.save();
        return newUser;
    } catch (error) {
        throw new Error('Error while creating user');
    }
};

module.exports = {
    getUserById,
    createUser,
};
