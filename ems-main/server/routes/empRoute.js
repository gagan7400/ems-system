const express = require("express");
let router = express.Router();
let { registeremp, getemp, loginemp, allemp, updateEmp, deleteEmp } = require("../controllers/empController.js");
const upload = require("../middleware/upload");
let jwt = require("jsonwebtoken");
const { authAdmin } = require("../middleware/authAdmin.js");

router.post("/registeremp", authAdmin, upload.single("image"), registeremp)
router.post("/loginemp", loginemp)
router.get("/allemp", authAdmin, allemp)
router.get("/getemp/:id", authAdmin, getemp)
router.put("/updateemp/:id", authAdmin, upload.single("image"), updateEmp)
router.delete("/deleteemp/:id", authAdmin, deleteEmp)

module.exports = router;    