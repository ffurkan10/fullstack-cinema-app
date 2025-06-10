const express = require('express');
const screeningController = require('../controllers/screeningController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.get('/', screeningController.getAllScreenings);

// router.post('/', authController.protect, authController.restrictTo("admin"), screeningController.createScreening);

// router.delete('/:screeningId', authController.protect, authController.restrictTo("admin"), screeningController.deleteScreening);

router.post('/seats', authController.protect, authController.restrictTo("admin"), screeningController.updateScreeningSeats);


module.exports = router;