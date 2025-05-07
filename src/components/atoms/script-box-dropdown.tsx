import useClickOutside from '@/lib/hooks/utils/use-click-outside';
import useToggle from '@/lib/hooks/utils/use-toggle';
import { IntervalBox } from '@/lib/types/intervals';
import { cn } from '@/lib/utils';
import { pluralizeBox } from '@/lib/utils/pluralizer';
import { Button, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/16/solid';
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

            <Dialog
                open={showPopup}
                onClose={() => toggleShowPopup(false)}
                className="relative z-50"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 backdrop-blur-sm duration-300 ease-out data-[closed]:opacity-0"
                />
                <div className="fixed inset-0 flex w-screen items-center flex-col justify-center overflow-y-auto">
                    <DialogPanel
                        transition
                        className={cn(
                            'bg-light-bg relative w-full rounded-2xl p-2 duration-300 ease-out data-[closed]:scale-40 data-[closed]:opacity-0 overflow-y-auto sm:w-80 max-w-80'
                        )}
                    >
                        <Button
                            onClick={() => toggleShowPopup(false)}
                            className="ml-auto cursor-pointer relative block p-1 rounded-full bg-input-bg"
                        >
                            <XMarkIcon className="size-4" />
                            <span className="absolute inset-0 size-8 -translate-x-1/2 [@media(pointer:fine)]:hidden"></span>
                        </Button>

                        <div className=" bg-light-bg py-2 px-2 rounded-lg space-y-3">
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
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}
