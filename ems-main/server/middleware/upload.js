let multer = require("multer");
let path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let filepath = path.join(__dirname, "../uploads")
        cb(null, filepath)
    },
    filename: async function (req, file, cb) {
        cb(null, file.originalname)
    }
})

let upload = multer({ storage: storage })
module.exports = upload;
