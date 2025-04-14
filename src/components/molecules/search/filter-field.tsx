import { Description, Field } from '@headlessui/react';

type FilterFieldProps = {
    title: string;
    children: React.ReactNode;
};

export default function FilterField({ title, children }: FilterFieldProps) {
    return (
        <Field>
            <Description className="text-sm mb-2.5 md:text-base">{title}</Description>
            {children}
        </Field>
    );
}
