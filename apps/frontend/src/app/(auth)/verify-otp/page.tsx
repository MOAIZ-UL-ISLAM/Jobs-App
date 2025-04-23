import Link from 'next/link';
import { VerifyOTPForm } from '@/components/forms/verify-otp-form';

export default function VerifyOTPPage() {
    return (
        <div className="min-h-screen flex items-center justify-center  p-4">
            <div className="w-full max-w-md">
                <VerifyOTPForm />
                <div className="mt-6 text-center text-sm text-muted-foreground px-2">
                    <Link href="/forgot-password" className="hover:text-primary transition-colors">
                        Resend OTP
                    </Link>
                </div>
            </div>
        </div>
    );
}
