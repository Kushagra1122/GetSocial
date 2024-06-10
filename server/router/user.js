const express = require("express")
const { register, login, getOtherUsers, otp } = require("../controllers/user")
const { isAuthenticated } = require("../middleware/isAuth")



const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/otp/:id", otp)
router.get("/get", isAuthenticated, getOtherUsers);



module.exports = router