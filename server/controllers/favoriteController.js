const User  = require('../models/userModel');

//! Filme favori ekle
exports.addFavorite = async (req, res, next) => {
  const userId  = req.user.id;          //? auth middleware’in koyduğu user objesinden
  const movieId = req.params.movieId;

  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favorites: movieId } }, //? aynı film birden çok eklenmez
    { new: true }
  ).populate('favorites');

  res.status(200).json({
    status: 'success',
    data: {
      favorites: user.favorites
    }
  });
};

//! Film favorilerden çıkar
exports.removeFavorite = async (req, res, next) => {
  const userId  = req.user.id;
  const movieId = req.params.movieId;

  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { favorites: movieId } },
    { new: true }
  ).populate('favorites');

  res.status(200).json({
    status: 'success',
    data: {
      favorites: user.favorites
    }
  });
};

//! Kullanıcının favori filmlerini listele
exports.getMyFavorites = async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('favorites');
  res.status(200).json({
    status: 'success',
    data: {
      favorites: user.favorites
    }
  });
};
