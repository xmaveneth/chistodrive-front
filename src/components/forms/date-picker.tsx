import { useId } from 'react';

type DatePickerProps = {
    value: string;
    onChange: (val: string) => void;
    className?: string;
};

export default function DatePicker({
    value,
    onChange,
    className,
}: DatePickerProps) {
    const id = useId();

  /*   const today = formatDateToDotFormat(new Date()); */

   /*  const inputValue = value
        ? formatDateFromString(value)
        : ''; */

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onChange(e.target.value)
        /* const raw = e.target.value;
        if (!raw) return onChange(today);

        try {
            const formatted = formatDateFromString(raw);
            onChange(formatted);
        } catch {
            onChange(today);
        } */
    }

    return (
        <div className={className}>
            <input
                id={id}
                type="date"
                value={value}
                onChange={handleChange}
                className="text-text-muted appearance-none w-full text-sm md:text-base md:py-3 md:px-6 input-field py-2 px-4 rounded-full flex items-center justify-between shadow-sm gap-2 mb-3 bg-input-bg"
            />
        </div>
    );
}
