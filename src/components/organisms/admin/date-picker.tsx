import { useState } from 'react';
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { upperFirst } from 'lodash';

type DatePickerProps = {
    value: Date | null;
    onChange: (date: Date | null) => void;
    label?: string;
};

export function DatePicker({
    value,
    onChange,
    label = 'Select a date',
}: DatePickerProps) {

    return (
        <div className="block max-w-85 mt-4 mx-auto">
            <div className="my-4 bg-input-bg rounded-full w-max mx-auto px-4 py-3 text-text-muted text-sm flex items-center justify-center">
                <div>
                    {value == null
                        ? label
                        : format(value, 'd MMM, yyyy', { locale: ru })}
                </div>
            </div>
            <DatePickerModal onChange={onChange} value={value} />
        </div>
    );
}

type DatePickerModalProps = {
    value: Date | null;
    onChange: (date: Date) => void;
};

function DatePickerModal({ value, onChange }: DatePickerModalProps) {
    const [visibleMonth, setVisibleMonth] = useState<Date>(value || new Date());

    function showPreviousMonth() {
        setVisibleMonth((currentMonth) => addMonths(currentMonth, -1));
    }

    function showNextMonth() {
        setVisibleMonth((currentMonth) => addMonths(currentMonth, 1));
    }

    const visibleDates = eachDayOfInterval({
        start: startOfWeek(startOfMonth(visibleMonth), {locale: ru }),
        end: endOfWeek(endOfMonth(visibleMonth), {locale: ru }),
    });

    return (
        <div className="p-2 shadow-md">
            <div className="flex items-center justify-between font-bold md:text-base px-2">
                <button className="cursor-pointer" onClick={showPreviousMonth}>
                    &larr;
                </button>
                <div className="current-month">
                    {upperFirst(
                        format(visibleMonth, 'LLLL - yyyy', { locale: ru })
                    )}
                </div>
                <button className="cursor-pointer" onClick={showNextMonth}>
                    &rarr;
                </button>
            </div>
            <div className="grid grid-cols-7 mb-2 mt-4 text-sm text-center md:text-base rounded-full bg-input-bg divide-x divide-white/10 p-2">
                <div>Пн</div>
                <div>Вт</div>
                <div>Ср</div>
                <div>Чт</div>
                <div>Пт</div>
                <div className='text-btn-bg'>Сб</div>
                <div className='text-btn-bg'>Вс</div>
            </div>
            <div className="grid grid-cols-7 grid-rows-6 text-sm text-center md:text-base rounded-sm">
                {visibleDates.map((date) => (
                    <button
                        onClick={() => onChange(date)}
                        className={`aspect-square cursor-pointer border border-white/10 ${
                            !isSameMonth(date, visibleMonth) && 'text-gray-400'
                        } ${
                            value &&
                            isSameDay(date, value) &&
                            'text-btn-bg! bg-input-bg rounded-sm'
                        }`}
                        key={date.toDateString()}
                    >
                        {date.getDate()}
                    </button>
                ))}
            </div>
        </div>
    );
}
