import User from '../models/userModel.js';

export const getUserById = async (userId) => {
  try {
    const user = await User.findOne({ userId });
    return user;
  } catch (error) {
    throw new Error('Error while fetching user data');
  }
};
