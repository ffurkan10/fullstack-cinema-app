const express = require("express")
const authController = require("../controllers/authController")

const router = express.Router()

router.get("/:id", authController.userInformation) //? kullanıcı bilgilerini almak için
router.post("/signup", authController.signUp) //? kullanıcı kaydı için
router.post("/login", authController.login) //? kullanıcı kaydı için

module.exports = router
