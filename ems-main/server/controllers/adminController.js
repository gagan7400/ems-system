let adminModel = require("../models/adminModel");
let bcrypt = require("bcryptjs");
const JwtToken = require("../utils/JwtToken");
let registeradmin = async (req, res) => {
    try {
        let { email, password, name, number } = req.body;
        let img = req.file;
        console.log(img)
        let image = {
            filename: img.originalname,
            path: `/uploads/${img.originalname}`
        }
        if (!email || !password || !name || !number) {
            return res.status(400).json({ result: false, message: "Please Provide valid details " });
        }
        let user = await adminModel.findOne({ email });
        if (user) {
            return res.status(400).json({ result: false, message: "Email Already Registered" })
        }

        let hashPassword = await bcrypt.hash(password, 10);
        let createuser = await adminModel({ email, password: hashPassword, name, number, image, role: "admin" });
        await createuser.save();
        return res.status(200).json({ result: true, message: "Admin Created Successfully" });
    } catch (error) {
        return res.status(400).json({ result: false, message: "Internal Server Error" })
    }
}
let loginadmin = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ result: false, message: "Please Provide all details" })
        }
        let user = await adminModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ result: false, message: "User Not Found" })
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            let token = await JwtToken(user, "xyz321uvw", '1h')
            return res.status(200).send({ result: true, message: "Login Successfully", user, token })
        } else {
            return res.status(400).send({ result: false, message: "PLs Provde valid Credentials" })
        }
    } catch (error) {
        return res.status(400).send({ result: false, message: "Internal Server Error" })
    }
}
let alluser = async (req, res) => {
    try {
        let data = await adminModel.find();
        return res.json({ data })
    } catch (error) {
        return res.send({ result: false })
    }
}
module.exports = { registeradmin, loginadmin, alluser }