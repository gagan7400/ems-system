const userModel = require("../models/usermodel");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken")
let createUserController = async (req, res) => {
    try {
        let { name, email, password, number } = req.body;
        console.log(name, email, password, number, req.file)
        let image = {
            filename: req.file.filename,
            path: `http://localhost:4000/uploads/${req.file.filename}`
        }
        let data = await userModel({ name, email, password, number, image });
        await data.save();
        res.send({ result: "success", message: "data submiited succesfuly", data })
    } catch (error) {
        console.log(error)
        res.status(400).json({ result: "faileds", message: error.message })
    }

}
let registerUserController = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        if (!email || !password || !name) {
            res.status(400).json({ result: "failed", message: "please provide Valid information" })
        }

        let user = await userModel.findOne({ email });
        if (user) {
            res.status(400).json({ result: "failed", message: "user Already Exsist" })
        }

        let salt = await bcrypt.genSalt(10);
        let hashpassword = await bcrypt.hash(password, salt);
        let data = await userModel.create({ name, email, password: hashpassword, empid: "GROWW-EM-" + allempoyee.length + 1 })
        res.send({ result: "success", message: "data submiited succesfuly" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ result: "failed", message: error.message })
    }

}

let getAllUserController = async (req, res) => {
    try {
        let data = await userModel.find().select("-password")
        res.json({ data })
    } catch (error) {
        res.status(400).json({ result: "failed", message: error.message })
    }
}
let middlewaretoken = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        if (!token) {
            res.json({ result: "failed", message: "kon he be tu , access denied" })
        }
        let verify = await jwt.verify(token, process.env.SECRETKEY)
        if (verify) {
            next();
        } else {
            res.status(400).json({ result: "failed", message: "kon he be tu , access denied" })
        }
    } catch (error) {
        res.json({ result: "failed", message: "internal server error" })
    }
}

let loginuser = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ result: "failed", message: "please provide Valid information" })
        }
        let user = await userModel.findOne({ email });
        if (!user) {
            res.status(400).json({ result: "failed", message: "wrong credentails" })
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            let token = await jwt.sign({ id: user._id }, process.env.SECRETKEY, { expiresIn: "20000ms" })
            res.send({ message: "login successfully", token })
        } else {
            res.status(400).json({ result: "failed", message: "wrong credentails" })
        }
    } catch (error) {
        res.status(400).json({ result: "failed", message: error.message })
    }
}
let getUserController = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await userModel.findById(id)
        // let data = await userModel.findOne({ name })
        res.json({ data })
    } catch (error) {
        res.status(400).json({ result: "failed", message: error.message })
    }
}
let updateUserController = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await userModel.findById(id);
        if (!user) {
            res.status(400).json({ result: "failed", message: "user not found" })
        }
        let data = await userModel.findByIdAndUpdate(id, req.body)
        res.json({ result: "success", message: "user update successfully" })
    } catch (error) {
        res.status(400).json({ result: "failed", message: error.message })
    }
}
let deleteUserController = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await userModel.findById(id);
        if (!user) {
            res.status(400).json({ result: "failed", message: "user not found" })
        }
        let data = await userModel.findByIdAndDelete(id)
        res.json({ result: "success", message: "user delete successfully" })
    } catch (error) {
        res.status(400).json({ result: "failed", message: error.message })
    }
}

module.exports = { middlewaretoken, loginuser, createUserController, registerUserController, getAllUserController, deleteUserController, getUserController, updateUserController }
