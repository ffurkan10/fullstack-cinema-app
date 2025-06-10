const express = require('express');
const menuController = require('../controllers/menuController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', menuController.getAllMenuItems);

router.post('/', authController.protect, authController.restrictTo("admin"), menuController.createMenuItem);

router.delete('/:id', authController.protect, authController.restrictTo("admin"), menuController.deleteMenuItem);

router.patch('/:id', authController.protect, authController.restrictTo("admin"), menuController.updateMenuItem);

module.exports = router; 