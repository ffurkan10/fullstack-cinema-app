const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    isAvailable: {
        type: Boolean,
        default: true
    },
    seatNumber: {
        type: Number,
        required: true
    },
    seatLetter: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 100
    }
})

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;