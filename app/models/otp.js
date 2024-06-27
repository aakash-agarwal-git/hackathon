const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    otp: {
        type: Array,
    },
    retryCount: {
        type: Number,
    },
});

module.exports = mongoose.model("OTP", otpSchema);
