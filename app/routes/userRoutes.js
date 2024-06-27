const express = require("express");
const { getUser, addUser } = require("../controllers/userController");

const router = express.Router();

router.get("/:userId", getUser);
router.post("/", addUser);

module.exports = router;
