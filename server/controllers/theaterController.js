const catchAsync = require('../utils/catchAsync');
const Theater = require('../models/theaterModel');
const Screening = require('../models/screeningModel');
const Seat = require('../models/seatModels');

exports.getAllTheaters = catchAsync(async (req, res, next) => {
    //? Theater koleksiyonundaki verileri alırken, screenings dizisini de populate ederek alıyoruz
     const theaters = await Theater.find().populate({
        path: 'screenings', 
        populate: {
            path: 'seats', 
            
        },
    });
    
    res.status(200).json({
        status: 'success',
        data: {
            theaters,
        },
    });
});


//! Koltukları oluşturma
const createSeats = async (seatsData) => {
    const seatPromises = seatsData.map(seat => {
        const seatDocument = new Seat({
            seatNumber: seat.seatNumber,
            seatLetter: seat.seatLetter
        });
        return seatDocument.save();
    });
    return await Promise.all(seatPromises);
};

//! Seansı oluşturma
const createScreening = async (screeningData, seats) => {
    const screening = new Screening({
        startTime: screeningData.startTime,
        seats: seats.map(seat => seat._id)  // Koltukların ID'lerini ekliyoruz
    });
    return await screening.save();
};

//! Salon oluşturma
exports.createTheater = catchAsync(async (req, res, next) => {
    const theaterData = req.body;

    // 1. Koltukları oluştur
    const seats = await createSeats(theaterData.screenings[0].seats);

    // 2. Seansları oluştur
    const screenings = await Promise.all(theaterData.screenings.map(async (screeningData) => {
        return await createScreening(screeningData, seats);
    }));

    // 3. Salonu oluştur
    const newTheater = await Theater.create({
        saloonId: theaterData.saloonId,
        facilities: theaterData.facilities,
        screenings: screenings
    });

    // Başarıyla salonu oluşturduktan sonra yanıtı gönder
    res.status(201).json({
        status: 'success',
        data: {
            theater: newTheater,
        },
    });

});