import useToggle from '@/lib/hooks/utils/use-toggle';
import { IntervalBox } from '@/lib/types/intervals';
import { cn } from '@/lib/utils';
import { pluralizeBox } from '@/lib/utils/pluralizer';
import { Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

type ScriptBoxDropdownProps = {
    boxes: IntervalBox[];
};

export default function ScriptBoxDropdown({ boxes }: ScriptBoxDropdownProps) {
    const [showPopup, toggleShowPopup] = useToggle(false);
    return (
        <div className="flex-1 flex items-center justify-center relative">
            <button
                className={cn(
                    'flex items-center gap-1',
                    boxes.length > 0 && 'cursor-pointer'
                )}
                onClick={() => {
                    if (boxes.length > 0) {
                        toggleShowPopup();
                    }
                }}
            >
                {`${pluralizeBox(boxes.length)}`}
                {boxes.length > 0 && (
                    <ChevronDown
                        className={cn(
                            'size-4 transition-transform duration-250',
                            showPopup && 'rotate-180'
                        )}
                    />
                )}
            </button>

            <Transition show={showPopup}>
                <div className="transition duration-300 ease-in data-closed:opacity-0 absolute top-full left-1/2 -translate-x-1/2 bg-light-bg py-3 px-4 rounded-lg w-3/4 z-30 space-y-3">
                    {boxes.map((box, index) => (
                        <div
                            key={`dropdown-box-${index}`}
                            className="flex items-center gap-3"
                        >
                            <div className="rounded-sm border border-btn-bg shrink-0 w-6">
                                {box.prio_num}
                            </div>
                            <div>{box.box_name}</div>
                        </div>
                    ))}
                </div>
            </Transition>
        </div>
    );
}
