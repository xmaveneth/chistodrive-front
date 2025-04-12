import { cn } from '@/lib/utils/cn';
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

type SelectFieldProps = {
    value: string;
    values: string[];
    onChange: (val: string) => void;
    className?: string;
}

export default function SelectField({value, onChange, values, className}: SelectFieldProps) {

    return (
        <div className={className}>
            <Listbox value={value} onChange={onChange}>
                <ListboxButton
                    className={cn(
                        'relative pr-8 pl-3 text-text-muted text-sm input-field py-2 px-4 rounded-full w-full flex items-center justify-between shadow-sm gap-2 mb-3 bg-input-bg',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                >
                    {value}
                    <ChevronDownIcon
                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                        aria-hidden="true"
                    />
                </ListboxButton>
                <ListboxOptions
                    anchor="bottom"
                    transition
                    className={cn(
                        'w-[var(--button-width)] rounded-xl z-[1500] border border-white/5 bg-background p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                >
                    {values.map((value) => (
                        <ListboxOption
                            key={value}
                            value={value}
                            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                        >
                            <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                            <div className="text-sm/6 text-white">
                                {value}
                            </div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </div>
    );
}
