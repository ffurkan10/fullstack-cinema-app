// routes/favoriteRoutes.js
const express = require('express');
const { addFavorite, removeFavorite, getMyFavorites } = require('../controllers/favoriteController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protect);  // tüm bu route’lar korunacak

router
  .route('/')               // GET /api/v1/favorites
  .get(getMyFavorites);

router
  .route('/:movieId')       // POST /api/v1/favorites/:movieId
  .post(addFavorite)        // favoriye ekle
  .delete(removeFavorite);  // favoriden çıkar

module.exports = router;
