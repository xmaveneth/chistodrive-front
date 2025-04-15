import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

type AccountNavLinkProps = {
    path: string;
    children: React.ReactNode;
};
export default function AccountNavLink({
    path,
    children,
}: AccountNavLinkProps) {
    const { pathname } = useLocation();

    const isActive = pathname === path;

    return (
        <Link
            className={cn(
                'border-b pb-4 flex-1 text-center text-sm transition-colors sm:text-base xl:text-lg',
                isActive ? 'border-white text-white' : 'border-text-muted text-text-muted hover:text-btn-bg hover:border-btn-bg'
            )}
            to={path}
        >
            {children}
        </Link>
    );
}
