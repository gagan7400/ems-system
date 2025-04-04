let express = require("express");
let { createUserController, middlewaretoken, deleteUserController, loginuser,
     registerUserController, updateUserController, getAllUserController, 
     getUserController } = require("../controllers/userController.js");
 
const upload = require("../middleware/upload.js");
let router = express.Router();


router.post("/createuser/", upload.single("image"), createUserController);
router.post("/register/", registerUserController);
router.post("/loginuser/", loginuser);
router.get("/getalluser/", middlewaretoken, getAllUserController);
router.get("/getuser/:id", getUserController);
router.put("/updateuser/:id", updateUserController);
router.delete("/deleteuser/:id", deleteUserController);

module.exports = router;