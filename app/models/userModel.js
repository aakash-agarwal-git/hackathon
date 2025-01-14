const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  restrictSource: {
    type: Array,
  },
  deviceToken: {
    type: String,
  },
  deviceId: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
