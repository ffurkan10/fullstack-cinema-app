const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = require("./app")

dotenv.config({ path: "./config.env" })

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then((con) => {
    console.log("DB bağlantısı başarılı")
})


app.get('/', (req, res) => {
  res.send('Sunucu çalışıyor!');
});

//! express ile sunucu oluşturma
const port = process.env.PORT || 5000
const server = app.listen(port, () => {
    console.log(`Sunucu ${port} üzerinde çalışıyor`);
})

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection! Shutting down...")
    console.log(err.name, err.message)
    server.close(() => {
        process.exit(1)
    })
})

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception! Shutting down...")
    console.log(err.name, err.message)
    server.close(() => {
        process.exit(1)
    })
})