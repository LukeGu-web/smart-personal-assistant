import { customAlphabet } from 'nanoid';
import nodemailer from 'nodemailer';
import { emailTemplate } from './emailTemplate.js';

export const nanoid = customAlphabet('1234567890abcdef', 10);

export const sendEmail = async (email, subject, link) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        type: 'login',
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const html = emailTemplate(link);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: html,
    });
    console.log('Sent email sucessfully!');
    return {
      success: true,
      message: 'email sent sucessfully',
    };
  } catch (error) {
    console.log(error, 'email not sent');
    return {
      success: false,
      message: 'email not sent',
      error,
    };
  }
};
