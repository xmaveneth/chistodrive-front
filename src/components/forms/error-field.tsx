import { Description } from '@headlessui/react';

type ErrorFieldProps = {
    children: React.ReactNode;
};
export default function ErrorField({ children }: ErrorFieldProps) {
    return (
        <Description className="mt-1 flex items-center gap-2 text-xs text-red-600">
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2 8.5C2 11.8133 4.68605 14.5 8 14.5C11.3139 14.5 14 11.8133 14 8.5C14 5.18605 11.3139 2.5 8 2.5C4.68605 2.5 2 5.18605 2 8.5Z"
                    stroke="#FB3748"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M8.0038 10.9621V8.09573V10.9621ZM8 6.0695V6.02734V6.0695Z" fill="#FB3748" />
                <path d="M8.0038 10.9621V8.09573M8 6.0695V6.02734" stroke="#FB3748" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {children}
        </Description>
    );
}
