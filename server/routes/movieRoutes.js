const express = require('express');
const movieController = require('../controllers/movieController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', movieController.getAllMovies);

router.get('/slug/:slug', movieController.getMovieBySlug);

router.post('/', authController.protect, authController.restrictTo("admin"),  movieController.createMovie);

router.delete('/:id', authController.protect, authController.restrictTo("admin"), movieController.deleteMovie);

router.patch('/:id', authController.protect, authController.restrictTo("admin"), movieController.updateMovie);

// router.patch('/removeMatch/:id', authController.protect, authController.restrictTo("admin"), movieController.removeMatch);


module.exports = router;