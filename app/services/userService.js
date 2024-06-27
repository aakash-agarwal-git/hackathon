const User = require("../models/userModel");
const userCategory = require("../models/userCategoryModel");
const { UID_CHAR, START_CHAR, END_CHAR } = require("../constants/user");

const generateUserId = () => {
    const characters = UID_CHAR;
    let result = START_CHAR;
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    result += END_CHAR;
    return result;
};

const createUser = async (deviceId) => {
    try {
        // Generate userId and create new user
        const userId = generateUserId();
        const newUser = new User({ userId, deviceId });
        await newUser.save();
        return newUser;
    } catch (error) {
        console.error("Error while creating user:", error.message);
        throw new Error("Error while creating user");
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findOne({ userId });
        return user;
    } catch (error) {
        throw new Error("Error while fetching user data");
    }
};

const getUserByDeviceId = async (deviceId) => {
    try {
        const user = await User.findOne({ deviceId });
        if (user) {
            const { userId } = user;
            const res = await userCategory.find({ userId });
            if (res) {
                const result = { user, res };
                return result;
            }
            return user;
        }
        return user;
    } catch (error) {
        throw new Error("Error while fetching user by deviceId");
    }
};

const updateUserDetails = async (userId, payload) => {
    try {
        return await User.findOneAndUpdate(
            { userId },
            { $set: payload },
            {
                upsert: true,
                returnNewDocument: true,
                returnDocument: "after",
            }
        );
    } catch (error) {
        throw new Error("Error while creating user");
    }
};

const updateUserById = async (userId, updateData) => {
    try {
        const user = await getUserById(userId);
        if (!user) {
            return null;
        }
        if (updateData.mobile) {
            const { mobile } = updateData;
            await User.findOneAndUpdate({ userId }, { mobile });
        }
        const updatedUser = await userCategory.findOneAndUpdate(
            { userId },
            { $set: updateData },
            { new: true, upsert: true }
        );
        return updatedUser;
    } catch (error) {
        console.error("Error while updating user:", error.message);
        throw new Error("Error while updating user");
    }
};

module.exports = {
    getUserById,
    createUser,
    getUserByDeviceId,
    updateUserDetails,
    updateUserById,
};
