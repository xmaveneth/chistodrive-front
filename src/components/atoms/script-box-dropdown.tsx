import useClickOutside from '@/lib/hooks/utils/use-click-outside';
import useToggle from '@/lib/hooks/utils/use-toggle';
import { IntervalBox } from '@/lib/types/intervals';
import { cn } from '@/lib/utils';
import { pluralizeBox } from '@/lib/utils/pluralizer';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';

type ScriptBoxDropdownProps = {
    boxes: IntervalBox[];
};

export default function ScriptBoxDropdown({ boxes }: ScriptBoxDropdownProps) {
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
                        boxes.length > 0 && 'cursor-pointer'
                    )}
                >
                    {`${pluralizeBox(boxes.length)}`}
                    {boxes.length > 0 && (
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
                    {boxes.map((box, index) => (
                        <div
                            key={`dropdown-box-${index}`}
                            className="flex items-center gap-3"
                        >
                            <div className="rounded-sm border flex items-center justify-center border-btn-bg shrink-0 w-6">
                                {box.prio_num}
                            </div>
                            <div>{box.box_name}</div>
                        </div>
                    ))}
                </PopoverPanel>
            </Popover>
        </div>
    );
}
