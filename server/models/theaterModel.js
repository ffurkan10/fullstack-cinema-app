const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
    saloonId: {
        type: Number,
        required: true,
        unique: true
    },
    facilities: {
        type: [String],
        enum: ['3D', 'IMAX', 'VIP', '2D', 'VIP'],
    },
    screenings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Screening',
    }]
    
})

const Theater = mongoose.model('Theater', theaterSchema);
module.exports = Theater;
