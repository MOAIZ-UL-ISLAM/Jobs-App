'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { getProfile } from '@/lib/redux/features/auth/auth-slice';
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
        if (!isAuthenticated && !loading) {
            router.push('/login');
        } else if (isAuthenticated) {
            dispatch(getProfile());
        }
    }, [isAuthenticated, loading, router, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
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
