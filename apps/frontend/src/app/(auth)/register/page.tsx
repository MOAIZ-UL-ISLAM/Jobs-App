import Link from 'next/link';
import { RegisterForm } from '@/components/forms/register-form';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center  p-4">
            <div className="w-full max-w-md">
                <RegisterForm />
                <div className="mt-6 text-center text-sm text-muted-foreground">
                    <Link href="/login" className="hover:text-black hover:underline transition-colors">
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
