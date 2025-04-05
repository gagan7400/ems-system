let empModel = require("../models/empModel");
let bcrypt = require("bcrypt");
const JwtToken = require("../utils/JwtToken");
let registeremp = async (req, res) => {
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
        let user = await empModel.findOne({ email });
        if (user) {
            res.status(400).json({ result: false, message: "Email Already Registered" })
        }
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);
        let createuser = await empModel({ email, password: hashPassword, name, number, image, role: "employee" });
        await createuser.save();
        res.status(200).json({ result: true, message: "Employee Created Successfully" });
    } catch (error) {
        res.status(400).json({ result: false, message: "Internal Server Error" })
    }
}
let loginemp = async (req, res) => {
    try {
        let { email, password } = req.body;
        console.log(email, password)
        if (!email || !password) {
            res.status(400).send({ result: false, message: "Please Provide all details" })
        }
        let user = await empModel.findOne({ email });
        if (!user) {
            res.status(400).send({ result: false, message: "User Not Found" })
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            let token = await JwtToken(user, process.env.SECRETKEY, '1h')
            res.status(200).send({ result: true, message: "Login Successfully", user, token })
        } else {
            res.status(400).send({ result: false, message: "PLs Provde valid Credentials" })
        }
    } catch (error) {
        res.status(400).send({ result: false, message: "Internal Server Error" })
    }
}
let allemp = async (req, res) => {
    try {
        let data = await empModel.find();
        res.send({ result: true, data })
    } catch (error) {
        res.send({ result: false, message: error.message })
    }
}
let getemp = async (req, res) => {
    try {
        let { id } = req.params;
        let emp = await empModel.findById(id);
        if (!emp) {
            res.send({ result: false, message: "Employee Not Found" })
        }

        res.send({ result: true, data: emp })
    } catch (error) {
        res.send({ result: false, message: error.message })
    }
}
let updateEmp = async () => {
    try {
        let { id } = req.params;
        let user = await empModel.findById(id);
        if (!user) {
            res.status(400).send({ result: false, message: "Employee Not Found" })
        }
        let data = await empModel.findByIdAndUpdate(id, { ...req.body });
        res.send({ result: true, message: "update successfully", data })

    } catch (error) {
        res.send({ result: false, message: error.message })
    }
}
let deleteEmp = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await empModel.findById(id);
        if (!user) {
            res.status(400).send({ result: false, message: "Employee Not Found" })
        }
        await empModel.findByIdAndDelete(id);
        res.status(200).send({ result: true, message: "Employee Delete Successfully", })

    } catch (error) {
        res.status(400).send({ result: false, message: "Internal Server Error" })
    }
}
module.exports = { registeremp, loginemp, allemp, updateEmp, deleteEmp, getemp }