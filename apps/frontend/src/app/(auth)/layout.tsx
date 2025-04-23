'use client';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {



    return (
        <div className="min-h-screen bg-gray-900 wh-bg" >
            {children}
        </div>
    );
}
