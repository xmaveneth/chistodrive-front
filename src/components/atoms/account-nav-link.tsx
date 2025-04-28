import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

type AccountNavLinkProps = {
    path: string;
    children: React.ReactNode;
    className?: string;
};
export default function AccountNavLink({
    path,
    children,
    className,
}: AccountNavLinkProps) {
    const { pathname } = useLocation();

    const isActive = pathname === path;

    return (
        <Link
            className={cn(
                'border-b pb-4 flex-1 text-center text-sm transition-colors ease-in duration-200 sm:text-base xl:text-lg',
                isActive ? 'border-white text-white' : 'border-text-muted text-text-muted hover:text-zinc-400 hover:border-zinc-400', className
            )}
            to={path}
        >
            {children}
        </Link>
    );
}
