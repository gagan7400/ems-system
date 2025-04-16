let empModel = require("../models/empModel");
let bcrypt = require("bcryptjs");
const JwtToken = require("../utils/JwtToken");
let registeremp = async (req, res) => {
    try {
        let { email, password, name, number } = req.body;
        let img = req.file;
        let image = {
            filename: img.originalname,
            path: `/uploads/${img.originalname}`
        }
        if (!email || !password || !name || !number) {
            return res.status(400).json({ result: false, message: "Please Provide valid details " });
        }
        let user = await empModel.findOne({ email });
        if (user) {
            return res.status(400).json({ result: false, message: "Email Already Registered" })
        }
        
        let hashPassword = await bcrypt.hash(password, 10);
        let createuser = await empModel({ email, password: hashPassword, name, number, image, role: "employee" });
        await createuser.save();
        return res.status(200).json({ result: true, message: "Employee Created Successfully" });
    } catch (error) {
        return res.status(400).json({ result: false, message: "Internal Server Error" })
    }
}
let loginemp = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.send({ result: false, message: "Please Provide all details" })
        }
        let user = await empModel.findOne({ email });
        if (!user) {
            return res.send({ result: false, message: "User Not Found" })
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            let token = await JwtToken(user, "xyz321uvw", '1h')
            return res.send({ result: true, message: "Login Successfully", user, token })
        } else {
            return res.send({ result: false, message: "PLs Provde valid Credentials" })
        }
    } catch (error) {
        return res.send({ result: false, message: error.message })
    }
}
let allemp = async (req, res) => {
    try {
        let data = await empModel.find();
        return res.send({ result: true, data })
    } catch (error) {
        return res.send({ result: false, message: error.message })
    }
}
let getemp = async (req, res) => {
    try {
        let { id } = req.params;
        let emp = await empModel.findById(id);
        if (!emp) {
            return res.send({ result: false, message: "Employee Not Found" })
        }
        return res.send({ result: true, data: emp })
    } catch (error) {
        return res.send({ result: false, message: error.message })
    }
}
let updateEmp = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await empModel.findById(id);
        if (!user) {
            return res.status(400).send({ result: false, message: "Employee Not Found" })
        }

        // Password check & hash if provided
        let updatedPassword = user.password;
        if (req.body.password) {
            
            updatedPassword = await bcrypt.hash(req.body.password,10);
        }
        let img = req.file;
        let image = "";
        if (img) {
            image = {
                filename: img.originalname,
                path: `/uploads/${img.originalname}`
            }
        }
        // If image not present in req.body, retain the old one
        const updatedData = {
            name: req.body.name || user.name,
            email: req.body.email || user.email,
            password: updatedPassword || user.password,
            number: req.body.number || user.number,
            image: image || user.image
        };

        let data = await empModel.findByIdAndUpdate(id, updatedData, { new: true });

        return res.send({ result: true, message: "Updated successfully", data });
        // let data = await empModel.findByIdAndUpdate(id, { ...req.body });
        // return res.send({ result: true, message: "update successfully", data })

    } catch (error) {
        return res.send({ result: false, message: error.message })
    }
}
let deleteEmp = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await empModel.findById(id);
        if (!user) {
            return res.status(400).send({ result: false, message: "Employee Not Found" })
        }
        await empModel.findByIdAndDelete(id);
        return res.status(200).send({ result: true, message: "Employee Delete Successfully", })

    } catch (error) {
        return res.status(400).send({ result: false, message: "Internal Server Error" })
    }
}
module.exports = { registeremp, loginemp, allemp, updateEmp, deleteEmp, getemp }