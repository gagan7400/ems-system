const express = require("express");
let router = express.Router();
let { registeremp, getemp, loginemp, allemp, updateEmp, deleteEmp } = require("../controllers/empController.js");
const upload = require("../middleware/upload");
let jwt = require("jsonwebtoken")
let authAdmin = async (req, res, next) => {
    try {
        // let token = req.headers.authorization.split(" ")[1];
        let token = req.headers.token;
        if (!token) {
            res.json({ result: "failed", message: "kon he be tu , access denied" })
        }
        let verify = await jwt.verify(token, process.env.SECRETKEY);
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
router.get("/allemp", authAdmin, allemp)
router.get("/getemp/:id", authAdmin, getemp)
router.put("/updateemp/:id", authAdmin, updateEmp)
router.delete("/deleteemp/:id", authAdmin, deleteEmp)

module.exports = router;    