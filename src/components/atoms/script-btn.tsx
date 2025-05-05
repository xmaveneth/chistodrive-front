import { cn } from '@/lib/utils/cn';
import { Button } from '@headlessui/react';

type ScriptBtnProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    route?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    isAcitve?: boolean;
    disabled?: boolean;
};
export default function ScriptBtn({
    children,
    className,
    onClick,
    type = 'button',
    isAcitve = false,
    disabled = false,
}: ScriptBtnProps) {
    return (
        <Button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={cn(
                'flex items-center justify-center cursor-pointer gap-[0.25em] rounded-full text-white px-[1.5em] py-[0.75em] transition-colors duration-200 ease-in hover:bg-white/10',
                className, isAcitve ? 'bg-white/20' : 'bg-input-bg'
            )}
        >
            {children}
        </Button>
    );
}
