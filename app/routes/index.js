const express = require("express");
const userRoute = require("./userRoutes");

const router = express.Router();

router.use("/users", userRoute);

module.exports = router;
