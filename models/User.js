const { required } = require("joi")
const mongoose = require("mongoose")
const { type } = require("os")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true ,
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User