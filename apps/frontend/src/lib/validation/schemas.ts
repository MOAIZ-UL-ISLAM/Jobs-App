import * as z from 'zod';

export const loginSchema = z.object({
  cnic: z.string()
    .regex(/^\d{13}$/, 'CNIC must be exactly 13 digits'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long'),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  fatherName: z.string().min(1, 'Father name is required'),
  email: z.string().email('Invalid email address'),
  dob: z.string().min(1, 'Date of birth is required'),
  cnic: z.string().regex(/^\d{13}$/, 'CNIC must be exactly 13 digits'),
  district: z.string().min(1, 'District is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const otpSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});