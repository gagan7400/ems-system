const express = require("express");
const db = require("./db/connectdb")
let app = express();
let path = require('path');
let dotenv = require("dotenv");
let nodemailer = require("nodemailer")
let cors = require("cors")

const adminRoute = require('./routes/adminRoute.js');
const empRoute = require('./routes/empRoute.js');
const taskRoute = require('./routes/taskRoute.js');
const bodyParser = require("body-parser")
dotenv.config();
app.use(express.json())
app.use(cors());
app.use(bodyParser.json())
let port = 4000
db("mongodb+srv://vishwakarmagagan24:3DMJE9dAQUts1ycd@cluster0.0z7qe.mongodb.net/movie?retryWrites=true&w=majority&appName=Cluster0");

let uploadpath = path.join(__dirname, 'uploads')
app.use("/uploads/", express.static(uploadpath))

// Routes

app.use('/api/admin/', adminRoute)
app.use('/api/emp/', empRoute)
app.use('/api/task/', taskRoute)


let frontendpath = path.join(__dirname, "../client/dist");
console.log(frontendpath)
app.use(express.static(frontendpath))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

app.use((err, req, res, next) => {
    console.error("Error caught by middleware:", err);
    // If response has already been sent, delegate to default Express error handler
    if (res.headersSent) {
        return next(err);
    }
    return res.status(err.status || 500).json({
        result: false,
        message: err.message || "Internal Server Error",
    });
})



app.listen(port, (err) => {
    console.log(err || "app run on port " + port)
})




