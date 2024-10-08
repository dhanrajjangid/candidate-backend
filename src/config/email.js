const nodemailer = require('nodemailer');
require("dotenv").config();
module.exports = {
  transporter: nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, 
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.EMAIL_SECRET
    },
  }),
};
