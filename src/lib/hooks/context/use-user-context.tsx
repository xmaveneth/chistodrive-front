import { UserContext } from '@/lib/providers/user-provider';
import { useContext } from 'react';

export function useUserContext() {
    const userContext = useContext(UserContext);

    if (userContext == null) {
        throw new Error('User context must be within provider');
    }

    return userContext;
}
