import crypto from 'crypto';

export const generateOTP = (): string => {
    // Generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateOTPExpiry = (): Date => {
    // OTP expires after 10 minutes
    return new Date(Date.now() + 10 * 60 * 1000);
};