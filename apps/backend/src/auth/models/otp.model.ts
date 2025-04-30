import mongoose, { Schema } from 'mongoose';
import { IOtp } from '../interfaces/user.interface';

const OtpSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600, // OTP expires after 10 minutes
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

export default mongoose.model<IOtp & Document>('Otp', OtpSchema);