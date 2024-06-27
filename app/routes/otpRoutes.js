const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');


router.post('/sendOTP', otpController.sendOTP);
router.post('/verifyOTP', otpController.verifyOTP);

module.exports = router;
