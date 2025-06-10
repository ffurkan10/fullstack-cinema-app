const mongoose = require('mongoose');

const screeningSchema = new mongoose.Schema({
    seats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seat',
        }
    ],
    startTime: {
        type: Date,
        required: true
    },
})

const Screening = mongoose.model('Screening', screeningSchema);
module.exports = Screening;
