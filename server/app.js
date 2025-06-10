const express = require("express")
const morgan = require("morgan")
const globalErrorHandler = require("./controllers/errorController")
const userRouter = require("./routes/userRoutes")
const movieRouter = require("./routes/movieRoutes") 
const screeningRouter = require("./routes/screeningRoutes")
const theaterRouter = require("./routes/theaterRoutes")
const favoriteRouter = require("./routes/favoriteRoutes")
const matmr = require("./routes/movieAndTheaterMatchRoutes")
const menuRouter = require("./routes/menuRoutes")
const app = express()

//! morgan middleware'i
app.use(morgan("dev")) //! dev modunda loglama yapar

app.use(express.json()) //! json verileri almak için kullanılır

//! middleware fonksiyonu
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    console.log("Request received");
    next() //! middleware fonksiyonu
})

app.use("/api/cinema/v1/users", userRouter) 
app.use("/api/cinema/v1/movies", movieRouter)
app.use("/api/cinema/v1/screenings", screeningRouter)
app.use("/api/cinema/v1/theaters", theaterRouter)
app.use("/api/cinema/v1/favorites", favoriteRouter) 
app.use("/api/cinema/v1/matches", matmr)
app.use("/api/cinema/v1/menus", menuRouter)

app.all("*", (req, res, next) => {
    console.log("404 error");
})

app.use(globalErrorHandler) //! hata yakalama middleware'i

module.exports = app //! app'i dışarı aktarıyoruz