import { useId } from 'react';
import { format, parse } from 'date-fns';
import { formatDateFromString, formatDateToDotFormat } from '@/lib/utils/format-date';

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

    const today = formatDateToDotFormat(new Date());

    const inputValue = value
        ? formatDateFromString(value)
        : '';

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value;
        if (!raw) return onChange(today);

        try {
            const parsedDate = parse(raw, 'yyyy-MM-dd', new Date());
            const formatted = format(parsedDate, 'dd.MM.yyyy');
            onChange(formatted);
        } catch {
            onChange(today);
        }
    }

    return (
        <div className={className}>
            <input
                id={id}
                type="date"
                value={inputValue}
                onChange={handleChange}
                className="text-text-muted appearance-none w-full text-sm md:text-base md:py-3 md:px-6 input-field py-2 px-4 rounded-full flex items-center justify-between shadow-sm gap-2 mb-3 bg-input-bg"
            />
        </div>
    );
}
