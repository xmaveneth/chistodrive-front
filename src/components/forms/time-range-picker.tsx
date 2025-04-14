import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Range } from 'react-range';

type TimeRangePickerProps = {
    from: string;
    to: string;
    onChange: (range: { from: string; to: string }) => void;
    className?: string;
};

const STEP = 1;
const MIN = 1;
const MAX = 48;

function convertToTime(value: number): string {
    const hours = Math.floor((value - 1) / 2);
    const minutes = value % 2 === 0 ? '30' : '00';
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

function parseTime(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 2 + (m >= 30 ? 1 : 0) + 1;
}

export default function TimeRangePicker({
    from,
    to,
    onChange,
    className,
}: TimeRangePickerProps) {
    const [values, setValues] = useState([parseTime(from), parseTime(to)]);

    useEffect(() => {
        onChange({
            from: convertToTime(values[0]),
            to: convertToTime(values[1]),
        });
    }, [values]);

    return (
        <div className={cn('mb-3 bg-input-bg rounded-full', className)}>
            <div className="text-white w-full text-sm md:text-base md:py-3 md:px-6 input-field py-2 px-4 flex items-center justify-between shadow-sm gap-2 divide-x-1 divide-text-muted/50">
                <div className="flex-1">
                    <span className="text-xs text-text-muted mr-2">от</span>
                    {convertToTime(values[0])}
                </div>
                <div className="flex-1 text-end">
                    <span className="text-xs text-text-muted ml-auto mr-2">до</span>
                    {convertToTime(values[1])}
                </div>
            </div>
            <div className="mx-auto w-7/10">
                <Range
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    values={values}
                    onChange={(vals) => {
                        if (vals[0] < vals[1]) setValues(vals);
                    }}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            className="h-px rounded-full bg-btn-bg relative"
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => {
                        const { key, ...rest } = props;
                        return (
                            <div
                                key={key}
                                {...rest}
                                className="size-2.5 bg-btn-bg rounded-full shadow-md"
                            />
                        );
                    }}
                />
            </div>
        </div>
    );
}
