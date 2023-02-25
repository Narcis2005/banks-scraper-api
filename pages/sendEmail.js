import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const sendEmail = async ({ text, subject, from }) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const message = {
    to: process.env.EMAIL_USERNAME,
    from,
    subject,
    text,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log(error);
        reject();
      }
      console.log(text);
      resolve();
    });
  });
};

export default sendEmail;
