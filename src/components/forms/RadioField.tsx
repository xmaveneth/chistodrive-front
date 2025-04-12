import { Field, Label, Radio } from '@headlessui/react';
import clsx from 'clsx';

type RadioFieldProps = {
    imagePath: string;
    fontName: string;
    fontDescription: string;
    value: string;
    shouldInvert: boolean;
};
export default function RadioField({ imagePath, fontName, fontDescription, value, shouldInvert }: RadioFieldProps) {
    return (
        <Field className="flex w-full cursor-pointer items-center gap-5 rounded-xl border border-colors p-4 relative isolate has-data-[checked]:bg-gray-neutral dark:has-data-[checked]:bg-[#232530]">
            <div className="grid aspect-square w-10 place-content-center rounded-xl border bg-colors border-colors p-1.5">
                <img src={imagePath} alt="Font sample" className={clsx(shouldInvert && 'dark:invert')} />
            </div>
            <Label>
                <p className="mb-1 font-bold">{fontName}</p>
                <p className="text-xs">{fontDescription}</p>
            </Label>
            <Radio
                value={value}
                className="group data-[checked]:bg-primary-blue ml-auto not-data-[checked]:border-2 border-colors flex size-6 items-center justify-center rounded-full"
            >
                <span className="invisible size-3 rounded-full bg-colors group-data-[checked]:visible" />
                <span className='absolute inset-0 z-10'></span>
            </Radio>
        </Field>
    );
}
