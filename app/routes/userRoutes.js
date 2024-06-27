const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const otpController = require('../controllers/otpController');

router.get('/:userId', userController.getUser);
router.post("/", addUser);
router.post('/sendOTP', otpController.sendOTP);
router.post('/verifyOTP', otpController.verifyOTP);

module.exports = router;
