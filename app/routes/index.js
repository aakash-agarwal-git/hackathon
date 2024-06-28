const express = require("express");
const userRoute = require("./userRoutes");
const dashboardRoute = require("./dashboardRoutes");
const otpRoute = require("./otpRoutes");
const categoryRoute = require("./categoryRoutes");
const testRoute = require("./testRoute");

const router = express.Router();

router.use("/users", userRoute);
router.use("/dashboard", dashboardRoute);
router.use("/otp", otpRoute);
router.use("/category", categoryRoute);
router.use("/test", testRoute);

module.exports = router;
