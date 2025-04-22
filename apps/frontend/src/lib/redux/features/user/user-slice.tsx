import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/services/api';
import { UserProfile, UserState } from '@/types/user';

const initialState: UserState = {
    profile: null,
    loading: false,
    error: null,
};

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (userData: Partial<UserProfile>) => {
        const { data } = await api.patch('/user/profile', userData);
        return data;
    }
);

export const changePassword = createAsyncThunk(
    'user/changePassword',
    async ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => {
        const { data } = await api.post('/user/change-password', {
            currentPassword,
            newPassword,
        });
        return data;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update profile';
            })
            // Change Password
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to change password';
            });
    },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;