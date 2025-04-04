let mongoose = require("mongoose");



let mediaSchema = new mongoose.Schema({
    filename: String,
    filesize: String,
    filepath: String,
})

let mediaModel = mongoose.model("medias", mediaSchema)

module.exports = mediaModel; 