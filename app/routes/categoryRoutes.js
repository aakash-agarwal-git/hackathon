const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/getCategory/:key', categoryController.getCategory);

module.exports = router;
