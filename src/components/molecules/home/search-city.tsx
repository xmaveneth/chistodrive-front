import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Input } from '@headlessui/react';

type SearchCityProps = {
    value: string;
    onChange: (val: string) => void;
};
export default function SearchCity({ value, onChange }: SearchCityProps) {
    return (
        <div className="relative text-text-muted input-field w-full py-2 px-4 rounded-full flex items-center justify-between shadow-sm gap-2 mb-3 bg-input-bg">
            <Input
                type="search"
                placeholder="Ваш город"
                className=" flex-1 shadow-none outline-none"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoFocus
            />
            <MagnifyingGlassIcon className="size-4" />
        </div>
    );
}
