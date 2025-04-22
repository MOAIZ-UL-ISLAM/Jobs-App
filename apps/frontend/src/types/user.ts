export interface UserProfile {
    userId: string;
    firstName: string;
    lastName: string;
    fatherName: string;
    email: string;
    dob: Date;
    cnic: string;
    district: string;
    createdAt: Date;
}

export interface UserState {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface UpdateProfileData {
    firstName?: string;
    lastName?: string;
    fatherName?: string;
    district?: string;
}