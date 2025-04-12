import { Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';
import ErrorField from './error-field';

type TextFieldProps = {
    label: string;
    type?: string;
    placeholder?: string;
    error?: string;
    shouldFocus?: boolean;
    registration: React.ComponentProps<'input'>;
};

export default function TextField({
    label,
    type = 'text',
    placeholder = '',
    shouldFocus = false,
    error,
    registration,
}: TextFieldProps) {
    return (
        <Field>
            <Label className="mb-1 flex items-center justify-between">
                {label}
            </Label>
            <Input
                {...registration}
                type={type}
                placeholder={placeholder}
                autoFocus={shouldFocus}
                className={clsx(
                    'data-[hover]:bg-[#232530] data-[focus]:shadow-input bg-input-bg w-full rounded-full border px-4 py-3 outline-none data-[focus]:ring-1',
                    error && 'border-red-600'
                )}
            />
            {error && <ErrorField>{error}</ErrorField>}
        </Field>
    );
}
