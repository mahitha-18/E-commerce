import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // Use service instead of host/port for Gmail
  auth: {
    user: process.env.EMAIL, // Your Gmail address
    pass: process.env.EMAIL_PASSWORD, // App password (not your Gmail password)
  },
});

export const sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: "Your OTP for E-Commerce Registration",
    html: `
      <p>Hello,</p>
      <p>Your One-Time Password (OTP) for E-Commerce registration is:</p>
      <p><strong>${otp}</strong></p>
      <p>This OTP is valid for a short time. Please do not share it with anyone.</p>
      <p>Best regards,<br>E-Commerce Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};