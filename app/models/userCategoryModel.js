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
    expiry: {
        type: Date,
    },
    preferredTime: {
        type: Date,
    },
    smsOpted: {
        type: Boolean,
    },
    categories: {
        type: Array,
    },
});

module.exports = mongoose.model("userCategory", userCategorySchema);
