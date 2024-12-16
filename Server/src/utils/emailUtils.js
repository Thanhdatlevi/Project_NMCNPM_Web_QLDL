const nodemailer = require('nodemailer'); // Gửi email
require('dotenv').config();

async function sendVerificationEmail(email, token) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const ENV_URL = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000' // URL production
        : process.env.PRODUCTION_URL; // URL local development

    const mailOptions = {
        from: 'neyduc167@gmail.com',
        to: email,
        subject: 'Email Verification',
        html: `Please verify your email by clicking on the following link: <br>
        <a href="${ENV_URL}/verify/${token}">${ENV_URL}/verify/${token}</a>`
    };
    try {
        // Gửi email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }

}

module.exports = {
    sendVerificationEmail
};