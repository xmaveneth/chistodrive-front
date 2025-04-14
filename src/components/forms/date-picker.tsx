import { useId } from 'react';
import { format, parse } from 'date-fns';

type DatePickerProps = {
    value: string | null;
    onChange: (val: string | null) => void;
    className?: string;
};

export default function DatePicker({
    value,
    onChange,
    className,
}: DatePickerProps) {
    const id = useId();

    const inputValue = value
        ? format(parse(value, 'dd.MM.yyyy', new Date()), 'yyyy-MM-dd')
        : '';

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value; // "yyyy-MM-dd"
        if (!raw) return onChange(null);

        try {
            const parsedDate = parse(raw, 'yyyy-MM-dd', new Date());
            const formatted = format(parsedDate, 'dd.MM.yyyy');
            onChange(formatted);
        } catch {
            onChange(null);
        }
    }

    return (
        <div className={className}>
            <input
                id={id}
                type="date"
                value={inputValue}
                onChange={handleChange}
                className="text-text-muted w-full text-sm md:text-base md:py-3 md:px-6 input-field py-2 px-4 rounded-full flex items-center justify-between shadow-sm gap-2 mb-3 bg-input-bg"
            />
        </div>
    );
}
