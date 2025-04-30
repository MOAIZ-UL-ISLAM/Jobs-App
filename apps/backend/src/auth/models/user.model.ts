// src/models/user.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUserDocument } from '../interfaces/user.interface';

// Pre-defined list of districts
const districts = [
    'Muzaffarabad', 'Kotli', 'Sundhoti', 'Bagh', 'Rawalakot', 'Neelum',
    'Jhellum', 'Refugees-1947', 'Refugees-1989', 'Mirpur', 'Bhimbher',
    'Poonch',];

const UserSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        default: function () {
            const date = new Date();
            const year = date.getFullYear().toString().slice(2);
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            return `USER-${year}${month}-${random}`;
        }
    },

    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        uppercase: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        uppercase: true,

    },
    fatherName: {
        type: String,
        required: [true, 'Father name is required'],
        trim: true,
        uppercase: true,

    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    dob: {
        type: Date,
        required: [true, 'Date of birth is required'],
    },
    cnic: {
        type: String,
        required: [true, 'CNIC is required'],
        unique: true,
        validate: {
            validator: function (v: string) {
                return /^\d{13}$/.test(v);
            },
            message: 'CNIC must be exactly 13 digits'
        }
    },
    district: {
        type: String,
        required: [true, 'District is required'],
        enum: districts,


    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash password and generate userId before saving
UserSchema.pre<IUserDocument>('save', async function (next) {
    try {
        if (this.isNew) {
            // Generate userId
            const date = new Date();
            const year = date.getFullYear().toString().slice(2);
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            this.userId = `USER-${year}${month}-${random}`;
        }

        // Hash password if modified
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }

        next();
    } catch (error) {
        next(error as any);
    }
});


// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};


export default mongoose.model<IUserDocument>('User', UserSchema);