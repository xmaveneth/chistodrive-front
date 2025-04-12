import { Field, Input, Label } from '@headlessui/react';
import { useState } from 'react';
import ErrorField from './ErrorField';
import HintField from './HintField';
import ShowInputBtn from './ShowInputBtn';
import { cn } from '@/lib/utils/cn';

type PasswordFieldProps = {
    registration: React.ComponentProps<'input'>;
    description?: string;
    error?: string;
    label: string;
};

export default function PasswordField({
    registration,
    description,
    error,
    label,
}: PasswordFieldProps) {
    const [showInput, setShowInput] = useState(false);

    return (
        <Field>
            <Label className="mb-1 flex items-center justify-between">
                {label}
            </Label>
            <div className="relative">
                <Input
                    {...registration}
                    type={showInput ? 'text' : 'password'}
                    className={cn(
                        'data-[hover]:bg-[#232530] data-[focus]:shadow-input bg-input-bg w-full rounded-full border px-4 py-3 outline-none focus:outline-none data-[focus]:ring-1',
                        error && 'border-red-600!'
                    )}
                />
                <ShowInputBtn
                    showInput={showInput}
                    onClick={() => setShowInput((o) => !o)}
                />
            </div>
            {error ? (
                <ErrorField>{error}</ErrorField>
            ) : (
                description && <HintField>{description}</HintField>
            )}
        </Field>
    );
}
