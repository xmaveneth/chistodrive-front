import { cn } from '@/lib/utils';
import { Link, matchPath, useLocation } from 'react-router-dom';

type AdminItemBtnProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    routeName?: string;
};
export default function AdminItemBtn({
    children,
    onClick,
    className,
    disabled = false,
    routeName,
}: AdminItemBtnProps) {
    const baseClasses = cn(
        'bg-lightest-bg py-[0.5em] px-[1em] flex items-center gap-[0.75em] rounded-full cursor-pointer transition-scale duration-250 ease-in hover:scale-110',
        className
    );

    const { pathname } = useLocation();
    const isActive = routeName != null ? matchPath(routeName, pathname) !== null : false;

    if (routeName != null) {
        return (
            <Link to={routeName} className={cn(baseClasses, isActive && 'ring-btn-bg ring-1')}>
                {children}
            </Link>
        );
    } else {
        return (
            <button
                className={cn(baseClasses)}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </button>
        );
    }
}
