const mongoose = require('mongoose');

const movieAndTheaterMatchSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater',
        required: true,
    },
})

const MovieAndTheaterMatch = mongoose.model('MovieAndTheaterMatch', movieAndTheaterMatchSchema);
module.exports = MovieAndTheaterMatch;