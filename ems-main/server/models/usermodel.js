let mongoose = require("mongoose");

let userSehcma = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, default: "xyz@gmail.com" },
    password: String,
    number: Number,
    image: { filename: String, path: String }
});

let userModel = mongoose.model("users", userSehcma);

module.exports = userModel; 