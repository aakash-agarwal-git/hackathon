const OTP = require('../models/OTP');

async function createOTPData(req, otpPayload) {
  try {
    const otpResponse = await OTP.findOneAndUpdate(
      {
        userId: req.body.userId,
        mobile: req.body.mobile,
      },
      otpPayload,
      {
        upsert: true,
        returnNewDocument: true,
        returnDocument: 'after',
      },
    );
    return otpResponse;
  } catch (error) {
    throw Error('Error while fetching user data');
  }
}

async function verifyOTPData(req) {
  try {
    const otpResponse = await OTP.findOne(
      {
        userId: req.body.userId,
        mobile: req.body.mobile, 
      }
    );
    return otpResponse;
  } catch (error) {
    throw Error('Error while fetching user data');
  }
}

async function updateOTPData(body) {
  try {
    const response = await this.otpModel.findOneAndUpdate(
      { userId: body.userId, mobile: body.mobile},
      { $set: { retryCount: count } },
    );
    return response;
  } catch (error) {
    throw Error('Error while fetching user data');
  }
}

module.exports = {
  createOTPData, verifyOTPData, updateOTPData
};
