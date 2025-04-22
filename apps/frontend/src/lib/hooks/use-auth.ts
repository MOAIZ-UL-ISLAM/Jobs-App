import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/redux/store';
import { logout } from '@/lib/redux/features/auth/auth-slice';

export function useAuth() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user, isAuthenticated, loading, error } = useSelector(
        (state: RootState) => state.auth
    );

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    return {
        user,
        isAuthenticated,
        loading,
        error,
        logout: handleLogout,
    };
}