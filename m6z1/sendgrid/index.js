const express = require('express');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const app = express();
const ejs = require('ejs');
const fs = require('fs').promises;
const path = require('path');

dotenv.config();

const PORT = process.env.PORT || 3000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.json());

const htmlTemplatePath = path.join(__dirname, 'views', 'emailTemplate.ejs');

app.post('/register', async (req, res) => {
    const { username, email } = req.body;
    const template = await fs.readFile(htmlTemplatePath, 'utf-8');
    const html = await ejs.render(template, { username });

    const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Welcome to MyApp',
        html,

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
