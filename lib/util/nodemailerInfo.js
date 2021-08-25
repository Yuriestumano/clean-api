const nodemailer = require("nodemailer");
require("dotenv").config();
const { APP_MAILER } = process.env;

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'giovane.yuri1@gmail.com',
    pass: APP_MAILER
  }
  });

module.exports = sendEmail;