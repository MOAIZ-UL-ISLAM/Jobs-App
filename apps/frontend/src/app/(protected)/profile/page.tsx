'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { Card } from '@/components/ui/card';

export default function ProfilePage() {
    const { user } = useSelector((state: RootState) => state.auth);
    console.log(user);


    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="p-6 space-y-6">
                <h1 className="text-2xl font-bold">Profile Information</h1>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-500">User ID</label>
                        <p className="mt-1">{user.userId}</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                        <p className="mt-1">{user.firstName} {user.lastName}</p>
                    </div>



                    <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="mt-1">{user.email}</p>
                    </div>



                </div>
            </Card>
        </div>
    );
}