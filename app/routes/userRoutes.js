const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:userId', userController.getUser);
router.post("/", userController.addUser);
router.get('/:userId/getRestrictUrl', userController.getRestrictUrl);
router.post('/updateRestrictUrl', userController.updateRestrictUrl);

module.exports = router;
