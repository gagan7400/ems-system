let mediaModel = require("../models/mediamodel");

let uploadmedia = async (req, res) => {
    try {
        // console.log(req.file, req.files)
        let mediadetail = {
            filename: req.file.filename,
            filesize: Number(req.file.size) / 1024 / 1024,
            filepath: `http://localhost:4000/uploads/${req.file.filename}`
        }
        let data = await mediaModel({ ...mediadetail });
        await data.save();
        return     res.send({ success: true, message: "image upload successfully", data: data })
    } catch (error) {
        return   res.json({ message: error.msg, success: "failed" })
    }
}
let getmedia = async (req, res) => {
    try {
        let data = await mediaModel.find({});
        return  res.send({ success: true, message: "image upload successfully", data })
    } catch (error) {
        return  res.json({ message: error.msg, success: "failed" })
    }
}
module.exports = { uploadmedia, getmedia }