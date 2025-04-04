const express = require("express");
let router = express.Router();
let { registeradmin, loginadmin, alluser } = require("../controllers/adminController");
const upload = require("../middleware/upload");
router.post("/register", upload.single("image"), registeradmin)
router.post("/login", loginadmin)
router.get("/alluser", alluser)

module.exports = router;    