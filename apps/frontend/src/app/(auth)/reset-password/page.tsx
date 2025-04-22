import { ResetPasswordForm } from '@/components/forms/reset-password-form';

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
            <div className="w-full max-w-md">
                <ResetPasswordForm />
            </div>
        </div>
    );
}
