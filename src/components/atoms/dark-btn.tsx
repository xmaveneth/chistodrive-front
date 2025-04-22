import { cn } from '@/lib/utils';
import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';

type DarkBtnProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    route?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    disabled?: boolean;
};

export default function DarkBtn({
    children,
    className,
    onClick,
    route,
    type = 'button',
    disabled = false,
}: DarkBtnProps) {
    const baseClasses = cn(
        'flex items-center justify-center cursor-pointer gap-[0.25em] bg-light-bg rounded-full text-white px-[1em] py-[0.65em] transition-colors duration-200 ease-in hover:bg-lightest-bg',
        className
    );

    return route != null ? (
        <Link to={route} className={cn('w-max', baseClasses)}>
            {children}
        </Link>
    ) : (
        <Button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={baseClasses}
        >
            {children}
        </Button>
    );
}
