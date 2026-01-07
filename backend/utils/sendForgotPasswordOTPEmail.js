import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendForgotPasswordOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: "OTP to Reset Your Password",
    html: `
      <p>Hello,</p>
      <p>You requested a password reset.</p>
      <p>Your OTP is:</p>
      <h2>${otp}</h2>
      <p>This OTP is valid for only a short time. Do NOT share it.</p>
      <p>If this wasn't you, please ignore this email.</p>
      <p>— E-Commerce Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
