const express = require("express");
const {
    getUser,
    addUser,
    getRestrictUrl,
    updateRestrictUrl,
    updateUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/:userId", getUser);
router.post("/", addUser);
router.get("/:userId/getRestrictUrl", getRestrictUrl);
router.post("/updateRestrictUrl", updateRestrictUrl);
router.put("/:userId", updateUser);



module.exports = router;
