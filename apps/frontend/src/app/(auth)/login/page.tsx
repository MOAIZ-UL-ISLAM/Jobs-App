import Link from 'next/link';
import { LoginForm } from '@/components/forms/login-form';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center  p-4">
            <div className="w-full max-w-md">
                <LoginForm />
                <div className="mt-6 flex justify-between text-sm text-muted-foreground px-2">
                    <Link href="/forgot-password" className="hover:text-primary transition-colors">
                        Forgot your password?
                    </Link>
                    <Link href="/register" className="hover:text-primary transition-colors">
                        Don't have an account?
                    </Link>
                </div>
            </div>
        </div>
    );
}
