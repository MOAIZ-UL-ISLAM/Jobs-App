import nodemailer from 'nodemailer';
import { emailConfig } from '../config/email';

// Create a transporter
const transporter = nodemailer.createTransport({
    service: emailConfig.service,
    auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass,
    },
});

export const sendWelcomeEmail = async (email: string, firstName: string): Promise<void> => {
    try {
        await transporter.sendMail({
            from: emailConfig.auth.user,
            to: email,
            subject: 'Welcome to Our Platform!',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333;">Welcome to Our Platform, ${firstName}!</h2>
          <p>Thank you for registering with us. We're excited to have you on board!</p>
          <p>You can now log in using your CNIC and password.</p>
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          <p>Best regards,<br>The Team</p>
        </div>
      `,
        });
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw new Error('Failed to send welcome email');
    }
};

export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
    try {
        await transporter.sendMail({
            from: emailConfig.auth.user,
            to: email,
            subject: 'Password Reset OTP',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You've requested to reset your password. Please use the following OTP code:</p>
          <h3 style="text-align: center; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">${otp}</h3>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this password reset, please ignore this email or contact support.</p>
          <p>Best regards,<br>The Team</p>
        </div>
      `,
        });
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};