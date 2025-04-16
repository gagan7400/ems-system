const Jwt = require("jsonwebtoken");

let authAdmin = async (req, res, next) => {
    try {
        // let token = req.headers.authorization.split(" ")[1];
        let token = req.headers.token;
        if (!token) {
            return res.json({ result: false, message: "kon he be tu , access denied" })
        }
        let verify = await Jwt.verify(token, "xyz321uvw");
        if (verify) {
            next();
        } else {
            return res.json({ result: false, message: "kon he be tu , access denied" })
        }
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
}
module.exports = { authAdmin }