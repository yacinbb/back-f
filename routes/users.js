const express = require("express")
const router = express.Router()
require("dotenv").config
const { getUsers, registerUser, loginUser } = require("../Controller/User")

router.get("/", getUsers)
router.post("/register", registerUser)
router.post("/login", loginUser)

module.exports = router 