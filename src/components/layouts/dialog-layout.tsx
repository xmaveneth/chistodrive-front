import {
    Button,
    Description,
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/16/solid';

type DialogLayoutProps = {
    isOpen: boolean;
    closeDialog: () => void;
    children: React.ReactNode;
    title?: string | null;
    description?: string | null;
};

export default function DialogLayout({
    isOpen,
    closeDialog,
    children,
    title,
    description,
}: DialogLayoutProps) {
    return (
        <Dialog open={isOpen} onClose={closeDialog} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 backdrop-blur-sm duration-300 ease-out data-[closed]:opacity-0"
            />
            <div className="fixed inset-0 flex w-screen items-center justify-center">
                <DialogPanel
                    transition
                    className="bg-background max-w-90 w-full sm:w-90 rounded-2xl p-2 duration-300 ease-out data-[closed]:scale-40 data-[closed]:opacity-0"
                >
                    <Button
                        onClick={closeDialog}
                        className="ml-auto cursor-pointer relative block p-1 rounded-full bg-input-bg"
                    >
                        <XMarkIcon className="size-4" />
                        <span className="absolute inset-0 size-8 -translate-x-1/2 [@media(pointer:fine)]:hidden"></span>
                    </Button>

                    <div className="px-3 text-text-muted">
                        {title != null && (
                            <DialogTitle className="text-center text-white mb-1 text-lg">
                                {title}
                            </DialogTitle>
                        )}
                        {description != null && (
                            <Description className="text-center text-sm text-balance">
                                {description}
                            </Description>
                        )}

                        {children}
                    </div>

                    <p className="text-xs text-white text-center mt-8 mb-2.5">
                        ©2025 CHISTO.DRIVE
                    </p>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
