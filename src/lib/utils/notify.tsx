import { toast } from 'react-toastify';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ToastContentProps } from 'react-toastify';

type CustomNotificationProps = ToastContentProps<{
    content: string;
}>;

function CustomNotification({ closeToast, data }: CustomNotificationProps) {
    return (
        <div className="w-full font-display font-medium">
            <button
                onClick={closeToast}
                className="absolute -top-2 -right-2 aspect-square p-1 rounded-full bg-background border-border border cursor-pointer transition-all duration-200 ease-in hover:bg-zinc-700/60 hover:scale-105 focus-within:scale-110"
            >
                <XMarkIcon className="size-4" />
            </button>
            <div className="p-2 flex items-center justify-center">
                <p className="text-center text-balance">{data.content}</p>
            </div>
        </div>
    );
}

export default function notify(message: string) {
    toast(CustomNotification, {
        data: { content: message },
        autoClose: 3000,
        closeButton: false,
        className: '!bg-light-bg !p-2 rounded-xl relative',
    });
}
