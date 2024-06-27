const userService = require('../services/userService');

async function getUser(req, res) {
  try {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  getUser,
};
