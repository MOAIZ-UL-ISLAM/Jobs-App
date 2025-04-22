'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { otpSchema } from '@/lib/validation/schemas';
import { authService } from '@/services/auth';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';

type FormData = z.infer<typeof otpSchema>;

export function VerifyOTPForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    const form = useForm<FormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            email,
            otp: '',
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            await authService.verifyOTP(data.email, data.otp);
            toast.success('OTP verified successfully. You can now reset your password.');
            router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
        } catch {
            toast.error('Invalid OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader className="text-center space-y-1">
                <CardTitle className="text-3xl font-semibold text-gray-100">Verify OTP</CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                    Enter the OTP sent to your email
                </CardDescription>
            </CardHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <CardContent className="space-y-4">
                        <input type="hidden" {...form.register('email')} value={email} />

                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>OTP</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter 6-digit OTP"
                                            maxLength={6}
                                            className="focus-visible:ring-2 focus-visible:ring-primary"
                                        />
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
                                    Verifying...
                                </>
                            ) : (
                                'Verify OTP'
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
