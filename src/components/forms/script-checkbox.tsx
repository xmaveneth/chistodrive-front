import { Field, Label, Checkbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

type ScriptCheckboxProps = {
    name: string;
    children: React.ReactNode;
    onChange: (event: { target: { name: string; value: boolean } }) => void;
    onBlur: (event: React.FocusEvent) => void;
    isChecked?: boolean;
};

export default function ScriptCheckbox({
    name,
    children,
    onChange,
    onBlur,
    isChecked = false,
}: ScriptCheckboxProps) {
    return (
        <Field>
            <div className="inline-flex items-center gap-3">
                <Checkbox
                    checked={isChecked}
                    onBlur={onBlur}
                    onChange={(checked) =>
                        onChange({ target: { name, value: checked } })
                    }
                    className="group block size-4 rounded-sm border border-btn-bg shrink-0 mt-0.5"
                >
                    <ChevronDownIcon className="text-white opacity-0 group-data-[checked]:opacity-100" />
                </Checkbox>
                <Label className="body-text text-sm md:text-base text-balance">
                    {children}
                </Label>
            </div>
        </Field>
    );
}
