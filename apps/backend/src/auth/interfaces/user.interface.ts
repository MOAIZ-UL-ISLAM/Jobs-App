import { HydratedDocument } from 'mongoose';

// Base user structure (matches your schema)
export interface IUser {
    userId: string;
    firstName: string;
    lastName: string;
    fatherName: string;
    email: string;
    dob: Date;
    cnic: string;
    district: string;
    password: string;
    createdAt: Date;
}

// Extend with Mongoose document helpers like isNew, isModified, etc.
export type IUserDocument = HydratedDocument<IUser> & {
    comparePassword(candidatePassword: string): Promise<boolean>;
};

// OTP interface for use with OTP logic
export interface IOtp {
    email: string;
    otp: string;
    createdAt: Date;
    expiresAt: Date;
}
