let mongoose = require("mongoose");

let adminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    number: Number,
    password: String,
    image: { filename: String, path: String },
    role: { type: String, default: "admin" },
    
}, Timestamp = true)

module.exports = mongoose.model("admins", adminSchema)