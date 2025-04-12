import ErrorField from '@/components/forms/error-field';
import { Field, Label, Checkbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { RefCallBack } from 'react-hook-form';

type CheckboxFieldProps = {
    children: React.ReactNode;
    name: string;
    onChange: (event: { target: { name: string; value: boolean } }) => void;
    onBlur: (event: React.FocusEvent) => void; 
    ref: RefCallBack;
    isChecked?: boolean;
    error?: string;
};

export default function CheckboxField({
    children,
    name,
    onChange,
    onBlur,
    ref,
    isChecked,
    error
}: CheckboxFieldProps) {
    return (
        <Field>
            <div className="inline-flex items-start gap-3">
                <Checkbox
                    name={name}
                    checked={isChecked}
                    onBlur={onBlur}
                    ref={ref}
                    onChange={(checked) =>
                        onChange({ target: { name, value: checked } })
                    }
                    className="group block size-4 rounded-sm border border-btn-bg shrink-0 mt-0.5"
                >
                    <ChevronDownIcon className='text-white opacity-0 group-data-[checked]:opacity-100' />
                </Checkbox>
                <Label className="body-text text-xs text-balance">{children}</Label>
            </div>
            {error && <ErrorField>{error}</ErrorField>}
        </Field>
    );
}
