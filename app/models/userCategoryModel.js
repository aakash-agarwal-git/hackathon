const { required } = require("joi");
const mongoose = require("mongoose");

const userCategorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "categorymasters",
    required: true,
  },
  expiry: {
    type: Date,
  },
  preferredTime: {
    type: Date,
  },
  smsOpted: {
    type: Boolean,
  },
});

module.exports = mongoose.model("userCategory", userCategorySchema);
