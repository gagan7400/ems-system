const nodemailer = require("nodemailer");
const sendMail = async ({ data }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
            user: "gagan.engineersahabedu@gmail.com",
            pass: "obzgfddcwzkgtfpl",
        },
    });

    // async..await is not allowed in global scope, must use a wrapper

    // send mail with defined transport object
    await transporter.sendMail({
        from: 'gagan.engineersahabedu@gmail.com', // sender address
        to: "vishwakarmagagan24@gmail.com", // list of receivers
        subject: "Hello ✔" + data, // Subject line
        text: "Hello world?", // plain text body
        html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form action="/api/media/upload/" method="post" enctype="multipart/form-data">
        <input type="file" name="avatar" />
        <input type="submit">
    </form>
    <script>

    </script>
</body>

</html> `
    });
}

module.exports = sendMail

