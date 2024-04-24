const sgMail = require("@sendgrid/mail");

require("dotenv").config();

sgMail.setApiKey(process.env.SEND_GRID_PASSWORD);

const msg = {
    from: "maksiu432@gmail.com",
    to: "maksiu432+test@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: "Text content",
    html: "<h1>Text Content</h1>",
};

sgMail
    .send(msg)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));