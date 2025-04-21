import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../models/user.model';
import OTP from '../models/otp.model';
import { sendWelcomeEmail, sendOTPEmail } from '../services/email.service';
import { generateOTP, generateOTPExpiry } from '../utils/passwordUtils';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            firstName,
            lastName,
            fatherName,
            email,
            dob,
            cnic,
            district,
            password,
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { cnic }] });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists with this email or CNIC' });
            return;
        }

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            fatherName,
            email,
            dob,
            cnic,
            district,
            password,
        });
        console.log('Before save:', newUser);


        await newUser.save();

        // Send welcome email
        await sendWelcomeEmail(email, firstName);

        res.status(201).json({
            message: 'Registration successful',
            user: {
                userId: newUser.userId,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed', error: error instanceof Error ? error.message : 'Unknown error' });
    }
};



export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cnic, password } = req.body;

        const user = await User.findOne({ cnic });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const jwtOptions: SignOptions = {
            expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn']
        };

        const token = jwt.sign(
            { id: user._id, userId: user.userId, email: user.email },
            process.env.JWT_SECRET as string,
            jwtOptions
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Login failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};



export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = generateOTPExpiry();

        // Save OTP to database
        await OTP.findOneAndDelete({ email }); // Delete any existing OTP
        await new OTP({ email, otp, expiresAt }).save();

        // Send OTP to user's email
        await sendOTPEmail(email, otp);

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Failed to process request', error: error instanceof Error ? error.message : 'Unknown error' });
    }
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, otp } = req.body;

        // Find OTP in database
        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            res.status(400).json({ message: 'Invalid OTP' });
            return;
        }

        // Check if OTP has expired
        if (otpRecord.expiresAt < new Date()) {
            await OTP.findOneAndDelete({ email, otp });
            res.status(400).json({ message: 'OTP has expired' });
            return;
        }

        // OTP is valid
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: 'Failed to verify OTP', error: error instanceof Error ? error.message : 'Unknown error' });
    }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Update password
        user.password = password;
        await user.save();

        // Delete OTP from database
        await OTP.findOneAndDelete({ email });

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ message: 'Failed to reset password', error: error instanceof Error ? error.message : 'Unknown error' });
    }
};

export const getDistricts = async (req: Request, res: Response): Promise<void> => {
    try {
        // List of pre-defined districts from User model
        const districts = [
            'Islamabad', 'Karachi', 'Lahore', 'Peshawar', 'Quetta', 'Faisalabad',
            'Rawalpindi', 'Multan', 'Gujranwala', 'Sialkot', 'Hyderabad'
        ];

        res.status(200).json({ districts });
    } catch (error) {
        console.error('Get districts error:', error);
        res.status(500).json({ message: 'Failed to fetch districts', error: error instanceof Error ? error.message : 'Unknown error' });
    }
};