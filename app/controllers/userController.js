const {
    createUser,
    getUserByDeviceId,
    getUserById,
    updateUserDetails
  } = require("../services/userService");

  const getUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  const addUser = async (req, res) => {
    try {
      const { deviceId } = req.body;
      if (!deviceId) {
        return res.status(400).json({ message: "Device Id is required" });
      }

      // Check if device already exists
      const existingUser = await getUserByDeviceId(deviceId);
      if (existingUser) {
        return res.status(200).json(existingUser);
      }

      // Create new user
      const newUser = await createUser(deviceId);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  const getRestrictUrl = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user.restrictSource);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const updateRestrictUrl = async (req, res) => {
    try {
      const preferences = req.body.preferences;
      const userId = req.body.userId;
      const user = await getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      let restrictSet = new Set(user.restrictSource);
  
      preferences.forEach(preference => {
          if (preference.include) {
              // Add url if include is true
              restrictSet.add(preference.url);
          } else {
              // Remove url if include is false
              restrictSet.delete(preference.url);
          }
      });
  
      // Convert the Set back to an array
      const restrictArray =  Array.from(restrictSet);
      await updateUserDetails(userId, { restrictSource: restrictArray });
      res.json(restrictArray);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  module.exports = {
    getUser,
    addUser,
    getRestrictUrl,
    updateRestrictUrl,
  };
