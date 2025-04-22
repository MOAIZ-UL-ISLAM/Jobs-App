'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { logout } from '@/lib/redux/features/auth/auth-slice';
import { Button } from '@/components/ui/button';
import { UserCircle, LogOut } from 'lucide-react';

export function Header() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href="/dashboard" className="font-semibold text-xl">
                        Dashboard
                    </Link>

                    <nav className="flex items-center space-x-4">
                        <Link
                            href="/profile"
                            className="flex items-center text-gray-700 hover:text-gray-900"
                        >
                            <UserCircle className="w-5 h-5 mr-2" />
                            {user?.firstName} {user?.lastName}
                        </Link>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-gray-700 hover:text-gray-900"
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Logout
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
}