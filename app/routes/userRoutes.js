const express = require('express');
const { getUser, addUser, getRestrictUrl, updateRestrictUrl } = require('../controllers/userController');

const router = express.Router();

router.get('/:userId', getUser);
router.post('/', addUser);
router.get('/:userId/getRestrictUrl', getRestrictUrl);
router.post('/updateRestrictUrl', updateRestrictUrl);

module.exports = router;
