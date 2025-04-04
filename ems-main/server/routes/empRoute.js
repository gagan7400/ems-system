const express = require("express");
let router = express.Router();
let { registeremp, loginemp, allemp, updateEmp } = require("../controllers/empController.js");
const upload = require("../middleware/upload");
let jwt = require("jsonwebtoken")
let authAdmin = async (req, res, next) => {
    try {
        // let token = req.headers.authorization.split(" ")[1];
        let token = req.headers.token;
        console.log(token)
        if (!token) {
            res.json({ result: "failed", message: "kon he be tu , access denied" })
        }
        console.log(process.env.SECRETKEY)
        let verify = await jwt.verify(token, process.env.SECRETKEY);
        console.log(verify)
        if (verify) {
            next();
        } else {
            res.json({ result: "failed", message: "kon he be tu , access denied" })
        }
    } catch (error) {
        console.log(error)
        res.json({ result: "failed", message: "internal server error", error })
    }
}
router.post("/registeremp", authAdmin, upload.single("image"), registeremp)
router.post("/loginemp", loginemp)
router.get("/allemp", allemp)
router.put("/updateemp:id", updateEmp)

module.exports = router;    