import { cn } from '@/lib/utils/cn';
import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';

type SecondaryBtnProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    route?: string;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
};
export default function SecondaryBtn({
    children,
    className,
    onClick,
    route,
    type = 'button',
    disabled = false
}: SecondaryBtnProps) {
    return route != null ? (
        <Link
            to={route}
            className={cn(
                'flex items-center justify-center cursor-pointer gap-[0.25em] ring-white/50 ring-1 rounded-full text-white px-[1.5em] py-[0.75em] transition-colors duration-200 ease-in hover:bg-white/20 w-max',
                className
            )}
        >
            {children}
        </Link>
    ) : (
        <Button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={cn(
                'flex items-center justify-center cursor-pointer gap-[0.25em] ring-white/50 ring-1 rounded-full text-white px-[1.5em] py-[0.75em] transition-colors duration-200 ease-in hover:bg-white/20',
                className
            )}
        >
            {children}
        </Button>
    );
}
