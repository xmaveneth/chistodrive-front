import { cn } from '@/lib/utils';
import {
    Button,
    Dialog,
    DialogBackdrop,
    DialogPanel,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/16/solid';

type LighthouseProps = {
    isOpen: boolean;
    closeDialog: () => void;
    img: string;
};

export default function Lighthouse({
    isOpen,
    closeDialog,
    img
}: LighthouseProps) {
    return (
        <Dialog open={isOpen} onClose={closeDialog} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 backdrop-blur-sm duration-300 ease-out data-[closed]:opacity-0"
            />
            <div className="fixed inset-0 flex w-screen items-center flex-col justify-center overflow-y-auto">
                <DialogPanel
                    transition
                    className={cn("bg-background relative w-full max-w-[90vw] h-full max-h-[90vh] rounded-2xl p-2 duration-300 ease-out data-[closed]:scale-40 data-[closed]:opacity-0 overflow-y-auto")}
                >
                    <Button
                        onClick={closeDialog}
                        className="ml-auto cursor-pointer relative block p-1 rounded-full bg-input-bg"
                    >
                        <XMarkIcon className="size-4" />
                        <span className="absolute inset-0 size-8 -translate-x-1/2 [@media(pointer:fine)]:hidden"></span>
                    </Button>

                    <div className="px-3 size-full max-h-9/10">
                        <img src={img} alt="image" className='object-center object-contain size-full' /> 
                    </div>

                </DialogPanel>
            </div>
        </Dialog>
    );
}
