import { AuthContext } from '@/lib/providers/auth-provider';
import { useContext } from 'react';

export function useAuthContext() {
    const authContext = useContext(AuthContext);

    if (authContext == null) {
        throw new Error('Must be within provider');
    }

    return authContext;
}
