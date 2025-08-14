import useToggle from '@/lib/hooks/utils/use-toggle';
import { createContext } from 'react';

type AuthContextType = {
    showLoginDialog: boolean;
    showSignupDialog: boolean;
    showForgotPasswordDialog: boolean;
    toggleLoginDialog: (value?: boolean) => void;
    toggleSignupDialog: (value?: boolean) => void;
    toggleForgotPasswordDialog: (value?: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [showLoginDialog, toggleLoginDialog] = useToggle(false);
    const [showSignupDialog, toggleSignupDialog] = useToggle(false);
    const token = new URLSearchParams(window.location.search).get('token');
    const [showForgotPasswordDialog, toggleForgotPasswordDialog] = useToggle(
        Boolean(token)
    );

    return (
        <AuthContext.Provider
            value={{
                showLoginDialog,
                showSignupDialog,
                showForgotPasswordDialog,
                toggleLoginDialog,
                toggleSignupDialog,
                toggleForgotPasswordDialog,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
