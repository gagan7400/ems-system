let adminModel = require("../models/adminModel");
let bcrypt = require("bcrypt");
const JwtToken = require("../utils/JwtToken");
let registeradmin = async (req, res) => {
    try {
        let { email, password, name, number } = req.body;
        let img = req.file;
        console.log(img)
        let image = {
            filename: img.originalname,
            path: `http://localhost:4000/uploads/${img.originalname}`
        }
        if (!email || !password || !name || !number) {
            res.status(400).json({ result: false, message: "Please Provide valid details " });
        }
        let user = await adminModel.findOne({ email });
        if (user) {
            res.status(400).json({ result: false, message: "Email Already Registered" })
        }
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);
        let createuser = await adminModel({ email, password: hashPassword, name, number, image, role: "admin" });
        await createuser.save();
        res.status(200).json({ result: true, message: "Admin Created Successfully" });
    } catch (error) {
        res.status(400).json({ result: false, message: "Internal Server Error" })
    }
}
let loginadmin = async (req, res) => {
    try {
        let { email, password } = req.body;
        console.log(email, password)
        if (!email || !password) {
            res.status(400).json({ result: false, message: "Please Provide all details" })
        }
        let user = await adminModel.findOne({ email });
        if (!user) {
            res.status(400).json({ result: false, message: "User Not Found" })
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            let token = await JwtToken(user, process.env.SECRETKEY, '1h')
            res.status(200).json({ result: true, message: "Login Successfully", user, token })
        } else {
            res.status(400).json({ result: false, message: "PLs Provde valid Credentials" })
        }
    } catch (error) {
        res.status(400).json({ result: false, message: "Internal Server Error" })
    }
}
let alluser = async (req, res) => {
    try {
        let data = await adminModel.find();
        res.json({ data })
    } catch (error) {
        res.send({ result: false })
    }
}
module.exports = { registeradmin, loginadmin, alluser }