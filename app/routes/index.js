const express = require("express");
const userRoute = require("./userRoutes");
const dashboardRoute = require("./dashboardRoutes");
const otpRoute = require("./otpRoutes");
const categoryRoute = require("./categoryRoutes");

const router = express.Router();

router.use("/users", userRoute);
router.use("/dashboard", dashboardRoute);
router.use("/otp", otpRoute);
router.use("/category", categoryRoute);

module.exports = router;
