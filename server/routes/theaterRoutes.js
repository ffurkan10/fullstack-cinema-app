const express = require('express');
const theaterController = require('../controllers/theaterController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', theaterController.getAllTheaters);

router.post('/', authController.protect, authController.restrictTo("admin"), theaterController.createTheater);


module.exports = router;