const mongoose = require('mongoose');
const slugify = require("slugify")

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Lütfen film adını giriniz.'],
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Lütfen film açıklamasını giriniz.'],
    },
    photo: {
        type: String,
    },
    duration: {
        type: Number,
        required: [true, 'Lütfen film süresini dakika olarak giriniz.'],
    },
    genre: {
        type: String,
        required: [true, 'Lütfen film türünü giriniz.'],
    },
    releaseDate: {
        type: Date,
        default: Date.now,
    },
    theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater',
    },
});

movieSchema.pre("save", function(next){ //! save işlemi öncesi çalışır
    this.slug = slugify(this.title, {lower: true})
    next() //! bir sonraki middleware'e geçiş yapar
})

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
