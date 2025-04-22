export interface LoginCredentials {
  cnic: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  fatherName: string;
  email: string;
  dob: string;
  cnic: string;
  district: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}