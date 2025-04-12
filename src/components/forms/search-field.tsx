import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Field, Input } from '@headlessui/react';
import { cn } from '@/lib/utils/cn';

type SearchFieldProps = {
    value: string;
    onChange: (val: string) => void;
    placeholder: string;
    className?: string;
};
export default function SearchField({ value, onChange, placeholder, className }: SearchFieldProps) {
    return (
        <Field className={cn("relative text-text-muted input-field py-2 px-4 rounded-full flex items-center justify-between shadow-sm gap-2 mb-3 bg-input-bg", className)}>
            <Input
                type="search"
                placeholder={placeholder}
                className="flex-1 shadow-none outline-none w-full"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoFocus
            />
            <MagnifyingGlassIcon className="size-4" />
        </Field>
    );
}
