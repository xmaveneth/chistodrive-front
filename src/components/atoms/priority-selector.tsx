import { cn } from '@/lib/utils';
import { range } from '@/lib/utils/range';
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import { X } from 'lucide-react';

type PrioritySelectorProps = {
    idx: number;
    selectedPriority: number;
    onChange: (idx: number, newPriority: number) => void;
};

export function PrioritySelector({
    idx,
    selectedPriority,
    onChange,
}: PrioritySelectorProps) {
    return (
        <Listbox
            value={selectedPriority}
            onChange={(newPriority) => onChange(idx, newPriority)}
        >
            <ListboxButton
                className={cn(
                    'rounded-sm border border-btn-bg shrink-0 w-6 flex items-center justify-center cursor-pointer',
                    selectedPriority === 0 && 'text-transparent'
                )}
            >
                {selectedPriority}
            </ListboxButton>
            <ListboxOptions
                anchor="bottom"
                className="bg-background p-2 space-y-1 text-center"
            >
                <ListboxOption
                    key="worker-priority-null"
                    value={0}
                    className="data-focus:bg-light-bg cursor-pointer"
                >
                    <X className="size-4" />
                </ListboxOption>
                {range(1, 10).map((priority) => (
                    <ListboxOption
                        key={`worker-priority-${priority}`}
                        value={priority}
                        className="data-focus:bg-light-bg cursor-pointer"
                    >
                        {priority}
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
    );
}
