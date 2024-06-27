const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:userId', userController.getUser);
//router.post("/", addUser);
router.get('/:userId/getRestrictUrl', userController.getRestrictUrl);
router.post('/updateRestrictUrl', userController.updateRestrictUrl);
router.get('/getCategory/:key', userController.getCategory);

module.exports = router;
