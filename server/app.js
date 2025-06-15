// const express = require("express")
// const morgan = require("morgan")
// const globalErrorHandler = require("./controllers/errorController")
// const userRouter = require("./routes/userRoutes")
// const movieRouter = require("./routes/movieRoutes") 
// const screeningRouter = require("./routes/screeningRoutes")
// const theaterRouter = require("./routes/theaterRoutes")
// const favoriteRouter = require("./routes/favoriteRoutes")
// const matmr = require("./routes/movieAndTheaterMatchRoutes")
// const menuRouter = require("./routes/menuRoutes")
// const cors = require('cors');
// const allowedOrigins = ['http://localhost:3000']; 

// const app = express()

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true //! Eğer cookie/token ile çalışıyorsan bunu ekle
// }));

// app.options('*', cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

// //! morgan middleware'i
// app.use(morgan("dev")) //! dev modunda loglama yapar

// app.use(express.json()) //! json verileri almak için kullanılır

// app.use("/api/cinema/v1/users", userRouter) 
// app.use("/api/cinema/v1/movies", movieRouter)
// app.use("/api/cinema/v1/screenings", screeningRouter)
// app.use("/api/cinema/v1/theaters", theaterRouter)
// app.use("/api/cinema/v1/favorites", favoriteRouter) 
// app.use("/api/cinema/v1/matches", matmr)
// app.use("/api/cinema/v1/menus", menuRouter)

// app.all("*", (req, res, next) => {
//     console.log("404 error");
// })

// app.use(globalErrorHandler) //! hata yakalama middleware'i

// module.exports = app //! app'i dışarı aktarıyoruz


const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const screeningRouter = require("./routes/screeningRoutes");
const theaterRouter = require("./routes/theaterRoutes");
const favoriteRouter = require("./routes/favoriteRoutes");
const matmr = require("./routes/movieAndTheaterMatchRoutes");
const menuRouter = require("./routes/menuRoutes");

const app = express();

// ✅ CORS ayarları (en başta olmalı!)
const allowedOrigins = ['http://localhost:3000', "https://fullstack-cinema-app.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS"
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// 🌐 Geliştirme logları
app.use(morgan("dev"));

// 🧠 JSON veriyi parse et
app.use(express.json());

// ⏱ Middleware: İstek zamanı
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("Request received");
  next();
});

// 🧭 Route tanımları
app.use("/api/cinema/v1/users", userRouter);
app.use("/api/cinema/v1/movies", movieRouter);
app.use("/api/cinema/v1/screenings", screeningRouter);
app.use("/api/cinema/v1/theaters", theaterRouter);
app.use("/api/cinema/v1/favorites", favoriteRouter);
app.use("/api/cinema/v1/matches", matmr);
app.use("/api/cinema/v1/menus", menuRouter);

// 🚫 404 handler
app.all("*", (req, res, next) => {
  const err = new Error(`Bu URL bulunamadı: ${req.originalUrl}`);
  err.status = 404;
  next(err); // ❗Unutma: next() ile error handler'a geçmelisin
});

// 🛑 Global hata yakalayıcı middleware
app.use(globalErrorHandler);

module.exports = app;