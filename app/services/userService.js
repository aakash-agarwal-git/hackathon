const User = require('../models/userModel');

async function getUserById(userId) {
  try {
    const user = await User.findOne({ userId });
    return user;
  } catch (error) {
    throw Error('Error while fetching user data');
  }
}

module.exports = {
  getUserById,
};
