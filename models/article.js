const mongoose = require("mongoose")

const articlSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    photo: String,
    price: {
        type: Number,
        required: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

const Article = mongoose.model("Article" ,articlSchema)

module.exports = Article ;