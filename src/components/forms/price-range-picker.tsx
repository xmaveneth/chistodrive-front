import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Range } from 'react-range';

type PriceRangePickerProps = {
    from: number;
    to: number;
    onChange: (range: { from: number; to: number }) => void;
    className?: string;
};

const STEP = 100;
const MIN = 0;
const MAX = 10000;

export default function PriceRangePicker({
    from,
    to,
    onChange,
    className,
}: PriceRangePickerProps) {
    const [values, setValues] = useState([from, to]);

    useEffect(() => {
        onChange({ from: values[0], to: values[1] });
    }, [values]);

    return (
        <div className={cn('mb-3 bg-input-bg rounded-full', className)}>
            <div className="text-white w-full text-sm md:text-base md:py-3 md:px-6 input-field py-2 px-4 flex items-center justify-between shadow-sm gap-2 divide-x-1 divide-text-muted/50">
                <div className="flex-1">
                    <span className="text-xs text-text-muted mr-2">от</span>
                    {values[0]} ₽
                </div>
                <div className="flex-1 text-end">
                    <span className="text-xs text-text-muted ml-auto mr-2">
                        до
                    </span>
                    {values[1]} ₽
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
                                className="size-2.5 bg-btn-bg rounded-full shadow-md relative"
                            >
                                <span className="absolute size-7 left-1/2 top-1/2 -translate-1/2 [@media(pointer:fine)]:hidden"></span>
                            </div>
                        );
                    }}
                />
            </div>
        </div>
    );
}
