import Link from 'next/link';
import { ForgotPasswordForm } from '@/components/forms/forgot-password-form';

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
            <div className="w-full max-w-md">
                <ForgotPasswordForm />
                <div className="mt-6 text-center text-sm text-muted-foreground px-2">
                    <Link href="/login" className="hover:text-primary transition-colors">
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
}
