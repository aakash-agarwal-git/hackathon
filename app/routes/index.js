const express = require("express");
const userRoute = require("./userRoutes");
const otpRoute = require("./otpRoutes");

const router = express.Router();

router.use("/users", userRoute);
router.use("/otp", otpRoute);

module.exports = router;
