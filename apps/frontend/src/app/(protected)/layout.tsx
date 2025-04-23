'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { getProfile, logout } from '@/lib/redux/features/auth/auth-slice';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { Sidebar } from '@/components/shared/sidebar';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        dispatch(getProfile()).unwrap().catch(() => {
            dispatch(logout());
            router.push('/login');
        });
    }, [dispatch, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                Loading
            </div>
        );
    }

    if (!isAuthenticated) {
        router.push('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.4%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22%2F%3E%3Ccircle%20cx%3D%2213%22%20cy%3D%2213%22%20r%3D%223%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] bg-gray-100">
            <div className="flex flex-col lg:flex-row min-h-screen">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <Header />
                    <main className="flex-1 p-4 overflow-y-auto">
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}