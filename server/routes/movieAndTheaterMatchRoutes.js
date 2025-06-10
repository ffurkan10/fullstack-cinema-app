const express = require('express');
const authController = require('../controllers/authController');
const movieAndMatchController = require('../controllers/movieAndTheaterMatchController');

const router = express.Router();

router.get('/', movieAndMatchController.getAllMatches);

router.post('/', authController.protect, authController.restrictTo("admin"),  movieAndMatchController.createMatch);

router.delete('/removeMatch/:id/:movieId', authController.protect, authController.restrictTo("admin"), movieAndMatchController.removeMatch);

module.exports = router;