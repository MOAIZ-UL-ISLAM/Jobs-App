'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { loginSchema } from '@/lib/validation/schemas';
import { login } from '@/lib/redux/features/auth/auth-slice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // <-- Import Label
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'; // <-- Import Card components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'; // <-- Import Form components
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react'; // Add this to imports


type FormData = z.infer<typeof loginSchema>;

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    // 1. Initialize the form using useForm with shadcn/ui structure
    const form = useForm<FormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            cnic: '',
            password: '',
        },
    });

    // 2. Define the submit handler
    const onSubmit = async (data: FormData) => {
        setIsLoading(true); // Set loading state
        try {
            await dispatch(login(data)).unwrap();
            toast.success('Successfully logged in'); // Use success variant
            router.push('/profile');
        } catch (error: any) {
            // Display more specific error if possible, otherwise generic
            const errorMessage = error?.message || 'Invalid credentials. Please try again.';
            toast.error(errorMessage); // Use error variant
            // Optionally reset password field on error
            // form.resetField('password');
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <Card className="w-full">
            <CardHeader className="text-center space-y-1">
                <CardTitle className="text-3xl font-semibold dark:text-gray-100">Welcome Back</CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                    Sign in to access your account
                </CardDescription>
            </CardHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="cnic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="cnic">CNIC</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="cnic"
                                            placeholder="Enter your 13-digit CNIC"
                                            className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                placeholder="Enter your password"
                                                type={showPassword ? 'text' : 'password'}
                                                className="pr-10" // Add padding so icon doesn't overlap text
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary focus:outline-none"
                                                tabIndex={-1} // Optional: don't focus the icon button when tabbing through fields
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>

                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}