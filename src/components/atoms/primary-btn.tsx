import { cn } from '@/lib/utils/cn';
import { Button } from '@headlessui/react';

type PrimaryBtnProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};
export default function PrimaryBtn({ children, className, onClick }: PrimaryBtnProps) {
    return (
        <Button
            onClick={onClick}
            className={cn(
                'flex items-center justify-center cursor-pointer gap-[0.25em] bg-btn-bg rounded-full text-white px-[1.5em] py-[0.75em] transition-colors duration-200 ease-in hover:bg-btn-hover',
                className
            )}
        >
            {children}
        </Button>
    );
}
