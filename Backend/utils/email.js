// import dotenv from 'dotenv'
// import nodemailer from "nodemailer";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.ADMIN_EMAIL, 
//     pass: process.env.ADMIN_PASSWORD,
//   },
// });

// export async function sendAccessRequestEmail({ from, message }) {
//   const mailOptions = {
//     from,
//     to: process.env.ADMIN_EMAIL,
//     subject: "Network Access Request",
//     text: message,
//   };
//   return transporter.sendMail(mailOptions);
// }
