const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Screening = require('../models/screeningModel');
const Movie = require('../models/movieModel');
const Theater = require('../models/theaterModel');
const Seat = require('../models/seatModels');

// exports.getAllScreenings = catchAsync(async (req, res, next) => {
//     const screenings = await Screening.find().populate('movie').populate('theater');

//     res.status(200).json({
//         status: 'success',
//         data: {
//             screenings,
//         },
//     });
// })

// exports.createScreening = catchAsync(async (req, res, next) => {
//     const { theaterId, screeningData } = req.body;

//     //? 1. Salonun bulunduğundan emin ol
//     const theater = await Theater.findById(theaterId);
//     if (!theater) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Salon bulunamadı!',
//         });
//     }

//     //? 2. Koltukları veritabanına kaydet
//     const seats = await Promise.all(
//         screeningData.seats.map(async (seat) => {
//             const newSeat = new Seat({
//                 seatNumber: seat.seatNumber,
//                 seatLetter: seat.seatLetter,
//             });
//             return await newSeat.save(); //? Koltuğu kaydet ve döndür
//         })
//     );

//     //? 3. Yeni bir Screening (seans) oluştur
//     const newScreening = new Screening({
//         startTime: screeningData.startTime,
//         seats: seats.map(seat => seat._id),  //? Koltukların _id'lerini referans olarak ekle
//     });

//     //? 4. Yeni seansı kaydet
//     await newScreening.save();

//     //? 5. Yeni seansı salonun screenings dizisine ekle
//     theater.screenings.push(newScreening._id);  //? Yeni seansın ID'sini screenings dizisine ekliyoruz
//     await theater.save();  //? Salon veritabanına kaydedilir

//     //? 6. Yanıt olarak başarılı bir mesaj ve yeni seansı gönder
//     res.status(201).json({
//         status: 'success',
//         message: 'Yeni seans başarıyla eklendi!',
//         data: {
//             screening: newScreening,  //? Yeni seansı döndürüyoruz
//         },
//     });
// })

// exports.deleteScreening = catchAsync(async (req, res, next) => {
//     const { screeningId } = req.params;

//     const screening = await Screening.findByIdAndDelete(screeningId);

//     if (!screening) {
//         return next(new AppError('Seans bulunamadı!', 404));
//     }

//     res.status(200).json({
//         status: 'success',
//         data: screening,
//     });
// })


//! Koltukları güncelleme işlemi
exports.updateScreeningSeats = catchAsync(async (req, res, next) => {
  const { screeningId, seatsToUpdate } = req.body;

  console.log(req.body);
  

  //? 1) Seansı ve koltuk referanslarını al
  const screening = await Screening.findById(screeningId).populate('seats');

  if (!screening) {
    return res.status(404).json({ status: 'fail', message: 'Seans bulunamadı' });
  }

  //? 2) Sadece o seansın koltuk ObjectId'leri üzerinden bulk güncelleme yap
  //? seatsToUpdate örneğin [{seatNumber:1,seatLetter:'A'},...]
  const orConditions = seatsToUpdate.map(s => ({
    _id: { $in: screening.seats.map(seat => seat._id) },
    seatNumber: s.seatNumber,
    seatLetter: s.seatLetter
  }));

  await Seat.updateMany(
    { $or: orConditions },
    { $set: { isAvailable: false } }
  );

  //? 3) Güncel durumu yeniden çek (re-populate)
  const updatedScreening = await Screening.findById(screeningId).populate('seats');

  //? 4) Dilersen tüm salonu, dilersen sadece bu seansı dönebilirsin
  res.status(200).json({
    status: 'success',
    data: {
      screening: updatedScreening
    }
  });
});




