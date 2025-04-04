let jwt = require("jsonwebtoken")
module.exports = async (user, secret, exp) => {
    let token = await jwt.sign({ userid: user._id }, secret, { expiresIn: exp });
    return token
}