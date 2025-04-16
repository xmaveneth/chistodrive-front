import { useCurrentUser } from '@/lib/hooks/auth/use-current-user';
import { User } from '@/lib/types/user';
import { createContext } from 'react';

type UserContextType = {
    isLoggedIn: boolean;
    isLoading: boolean;
    user: User | undefined;
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
