const express = require("express");
const userRoute = require("./userRoutes");
const dashboardRoute = require("./dashboardRoutes");
const router = express.Router();

router.use("/users", userRoute);
router.use("/dashboard", dashboardRoute);
module.exports = router;
