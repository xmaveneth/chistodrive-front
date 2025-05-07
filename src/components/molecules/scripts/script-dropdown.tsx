import useClickOutside from '@/lib/hooks/utils/use-click-outside';
import useToggle from '@/lib/hooks/utils/use-toggle';
import { cn } from '@/lib/utils';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';

type ItemWithPriority = {
    prio_num: number;
    [key: string]: any;
};

type ScriptDropdownProps<T extends ItemWithPriority> = {
    items: T[];
    getName: (item: T) => string;
    pluralize: (count: number) => string;
};

export default function ScriptDropdown<T extends ItemWithPriority>({
    items,
    getName,
    pluralize,
}: ScriptDropdownProps<T>) {
    const [showPopup, toggleShowPopup] = useToggle(false);
    const modalRef = useRef(null);

    useClickOutside(modalRef, () => {
        if (showPopup) toggleShowPopup(false);
    });

    return (
        <div
            ref={modalRef}
            className="flex-1 flex items-center justify-center relative"
        >
            <Popover className="relative group">
                <PopoverButton
                    className={cn(
                        'flex items-center gap-1 relative',
                        items.length > 0 && 'cursor-pointer'
                    )}
                >
                    {pluralize(items.length)}
                    {items.length > 0 && (
                        <ChevronDown
                            className={cn(
                                'size-4 transition-transform duration-250 group-data-open:rotate-180'
                            )}
                        />
                    )}
                </PopoverButton>
                <PopoverPanel
                    anchor="bottom"
                    className="bg-light-bg py-2 px-2 rounded-lg space-y-3"
                >
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="rounded-sm border flex items-center justify-center border-btn-bg shrink-0 w-6">
                                {item.prio_num}
                            </div>
                            <div>{getName(item)}</div>
                        </div>
                    ))}
                </PopoverPanel>
            </Popover>
        </div>
    );
}
