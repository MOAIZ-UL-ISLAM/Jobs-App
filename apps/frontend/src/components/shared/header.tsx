'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { logout } from '@/lib/redux/features/auth/auth-slice';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="bg-gray-100 shadow">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/profile" className="text-2xl font-bold text-black">
                        AJK-PSC
                    </Link>

                    {/* Avatar Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>

                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>


                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>
                                Welcome, {user?.email}🙂
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/profile">My Account</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/change-password">Change Password</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
