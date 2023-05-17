const mongoose = require("mongoose")

const Schema = mongoose.Schema

const questionSchema = new Schema({
    text : String,
    options : [String],
    answer : Number,
})

module.exports = mongoose.model("Question", questionSchema)