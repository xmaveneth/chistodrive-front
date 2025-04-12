import useToggle from '@/lib/hooks/useToggle';
import { createContext } from 'react';

type AuthContextType = {
    showLoginDialog: boolean;
    showSignupDialog: boolean;
    toggleLoginDialog: (value?: boolean) => void;
    toggleSignupDialog: (value?: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [showLoginDialog, toggleLoginDialog] = useToggle(false);
    const [showSignupDialog, toggleSignupDialog] = useToggle(false);

    return (
        <AuthContext.Provider
            value={{
                showLoginDialog,
                showSignupDialog,
                toggleLoginDialog,
                toggleSignupDialog,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
