const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Movie = require('../models/movieModel');

exports.getAllMovies = catchAsync(async (req, res, next) => {
    const movies = await Movie.find()
    .populate({
        path: 'theater', //? Movie modelinde theater ilişkisini alıyoruz
        populate: {
            path: 'screenings', //? theater modelindeki screenings'i de popüle ediyoruz
            populate: {
                path: 'seats', //? screenings modelindeki seats'ı da popüle ediyoruz
            }
        },
    });

    res.status(200).json({
        status: 'success',
        results: movies.length,
        data: {
            movies,
        },
    })
})

exports.getMovieBySlug = catchAsync(async (req, res, next) => {
    const movie = await Movie.findOne({ slug: req.params.slug }).populate({
        path: 'theater', //? Movie modelinde theater ilişkisini alıyoruz
        populate: {
            path: 'screenings', //? theater modelindeki screenings'i de popüle ediyoruz
            populate: {
                path: 'seats', //? screenings modelindeki seats'ı da popüle ediyoruz
            }
        },
    });

    if (!movie) {
        return next(new AppError('No movie found with that slug', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            movie,
        },
    });
});


exports.createMovie = catchAsync(async (req, res, next) => {
    const newMovie = await Movie.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            movie: newMovie,
        },
    })
})

exports.updateMovie = catchAsync(async (req, res, next) => {
    
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if(req.body.theater && movie.theater){
        return next(new AppError('Bu film zaten bir salon ile eşleştirilmiş. Lütfen eşleştirmeyi kaldırıp tekrar deneyiniz.', 404));
    }

    if(!movie) {
        return next(new AppError('No movie found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            movie,
        },
    })
})


exports.deleteMovie = catchAsync(async (req, res, next) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if(!movie) {
        return next(new AppError('No movie found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: movie,
    })
})