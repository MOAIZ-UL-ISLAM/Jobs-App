import { api } from './api';
import { LoginCredentials, RegisterData, ResetPasswordData } from '@/types/auth';

export const authService = {
    async login(credentials: LoginCredentials) {
        const { data } = await api.post('/auth/login', credentials);
        return data;
    },

    async register(userData: RegisterData) {
        const { data } = await api.post('/auth/register', userData);
        return data;
    },

    async forgotPassword(email: string) {
        const { data } = await api.post('/auth/forgot-password', { email });
        return data;
    },

    async verifyOTP(email: string, otp: string) {
        const { data } = await api.post('/auth/verify-otp', { email, otp });
        return data;
    },

    async resetPassword(resetData: ResetPasswordData) {
        const { data } = await api.post('/auth/reset-password', resetData);
        return data;
    },

    async getProfile() {
        const { data } = await api.get('/auth/profile');
        return data;
    },

    async getDistricts() {
        const { data } = await api.get('/auth/districts');
        return data;
    },
};