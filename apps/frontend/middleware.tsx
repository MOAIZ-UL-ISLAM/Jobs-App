import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/register') ||
        request.nextUrl.pathname.startsWith('/forgot-password');

    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }

    if (!isAuthPage && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // '/dashboard/:path*',
        '/profile/:path*',
        '/login',
        '/register',
        '/forgot-password',
    ],
};