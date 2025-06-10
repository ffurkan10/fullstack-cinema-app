const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Movie = require('../models/movieModel');
const MovieAndTheaterMatch = require('../models/movieAndTheaterMatchModel');

exports.removeMatch = catchAsync(async (req, res, next) => {
    const { id, movieId } = req.params;  //? Burada id ve movieId parametrelerini alıyoruz

    console.log(req.params);
    

    //? 1. MovieAndTheaterMatch eşleşmesini sil
    const match = await MovieAndTheaterMatch.findByIdAndDelete(id);

    //? Eğer eşleşme bulunmazsa, hata mesajı döndür
    if (!match) {
        return next(new AppError('No match found with that ID', 404));
    }

    //? 2. Movie'den theater bilgisini null yaparak ilişkiyi kes
    const movie = await Movie.findByIdAndUpdate(movieId, { theater: null }, {
        new: true,
        runValidators: true,
    });

    //? Eğer movie bulunamazsa, hata mesajı döndür
    if (!movie) {
        return next(new AppError('No movie found with that ID', 404));
    }

    //? 3. Başarıyla işlem tamamlandığında yanıt gönder
    res.status(200).json({
        status: 'success',
        message: 'Match and theater relationship removed successfully!',
        data: {
            match,
        },
    });
});


exports.createMatch = catchAsync(async (req, res, next) => {
    //? 1. Eşleşmenin zaten var olup olmadığını kontrol et
    const existingMatch = await MovieAndTheaterMatch.findOne({
        movie: req.body.movie,
        theater: req.body.theater,
    });

    //? 2. Eğer eşleşme varsa, hata ver
    if (existingMatch) {
        return next(new AppError('Bu film ve salon zaten eşleştirilmiş. Lütfen eşleştirmeyi kaldırıp tekrar deneyiniz.', 400));
    }

    //? 3. Film mevcut mu diye kontrol et
    const movie = await Movie.findById(req.body.movie);
    if (!movie) {
        return next(new AppError('No movie found with that ID', 404));
    }

    //? 4. Film zaten bir salonla eşleştirilmişse, hata ver
    if (movie.theater) {
        return next(new AppError('Bu film zaten bir salon ile eşleştirilmiş. Lütfen eşleştirmeyi kaldırıp tekrar deneyiniz.', 400));
    }

    //? 5. Yeni eşleşmeyi oluştur
    const newMatch = await MovieAndTheaterMatch.create(req.body);

    //? 6. Film ve salonu eşleştir
    await Movie.findByIdAndUpdate(req.body.movie, { theater: req.body.theater }, {
        new: true,
        runValidators: true,
    });

    //? 7. Yeni eşleşmeyi ve ilişkili modelleri populate et
    const populatedMatch = await MovieAndTheaterMatch.findById(newMatch._id)
        .populate({
            path: 'movie',
        })
        .populate({
            path: 'theater',
            populate: {
                path: 'screenings',
            },
        });

    //? 8. Başarıyla yeni eşleşme oluşturulduktan sonra yanıt gönder
    res.status(200).json({
        status: 'success',
        data: {
            newMatch: populatedMatch,
        },
    });
});


exports.getAllMatches = catchAsync(async (req, res, next) => {
    const matches = await MovieAndTheaterMatch.find().populate('movie').populate({
        path: 'theater',
        populate: {
            path: 'screenings',
        }

    });

    if(!matches) {
        return next(new AppError('No matches found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            matches,
        },
    })
})