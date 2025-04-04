// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './db/db.js';
// import authRoutes from './routes/authRoutes.js';
// import adminRoute from './routes/adminRoute.js';

// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(cors());

// connectDB();
// app.use('/api/auth', authRoutes);
// app.use('/api/admin/', adminRoute)
// app.listen(5000, () => console.log('Server running on port 5000'));


const express = require("express");
const db = require("./db/connectdb")
let app = express();
let path = require('path');
let dotenv = require("dotenv");
let nodemailer = require("nodemailer")
let cors = require("cors")
let userRoute = require('./routes/getRoute');
const adminRoute = require('./routes/adminRoute.js');
const empRoute = require('./routes/empRoute.js');
dotenv.config();
app.use(express.json())
app.use(cors());

let port = process.env.PORT || 4000
db(process.env.MONGOURL);

let uploadpath = path.join(__dirname, 'uploads')
app.use("/uploads/", express.static(uploadpath))

// Routes
app.use("/api/user/", userRoute)
app.use('/api/admin/', adminRoute)
app.use('/api/emp/', empRoute)

app.listen(port, (err) => {
    console.log(err || "app run on port " + port)
})




