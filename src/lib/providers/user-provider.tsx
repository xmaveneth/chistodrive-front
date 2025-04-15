import { useCurrentUser } from '@/lib/hooks/useCurrentUser';
import { CurrentUserResponse } from '@/services/api/auth';
import { createContext } from 'react';

type UserContextType = {
    isLoggedIn: boolean;
    isLoading: boolean;
    user: CurrentUserResponse | undefined;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const { data: user, isLoading, isError } = useCurrentUser();

    const isLoggedIn = !(isError || !user);
    
    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                user
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
