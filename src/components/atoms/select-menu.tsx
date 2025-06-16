import { cn } from "@/lib/utils";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

type SelectMenuProps = {
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    values: string[];
}

export default function SelectMenu({selected, setSelected, values}: SelectMenuProps) {
    return (<Listbox value={selected} onChange={setSelected}>
        <ListboxButton
            className={cn(
                'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white',
                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
            )}
        >
            {selected}
            <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
            />
        </ListboxButton>
        <ListboxOptions
            anchor="bottom"
            transition
            className={cn(
                'w-(--button-width) rounded-xl border border-white/5 bg-black p-1 [--anchor-gap:--spacing(1)] focus:outline-none',
                'transition duration-100 ease-in data-leave:data-closed:opacity-0'
            )}
        >
            {values.map((value) => (
                <ListboxOption
                    key={value}
                    value={value}
                    className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                >
                    <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                    <div className="text-sm/6 text-white">{value}</div>
                </ListboxOption>
            ))}
        </ListboxOptions>
    </Listbox>)
}
