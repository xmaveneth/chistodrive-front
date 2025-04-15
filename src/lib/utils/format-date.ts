import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';

const defaultDateOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'full',
    timeStyle: 'short',
};

export function formatDate(date: Date, options = defaultDateOptions) {
    return new Intl.DateTimeFormat(undefined, options).format(date);
}

export function formatDateFromString(date: string) {
    return format(parse(date, 'dd.MM.yyyy', new Date()), 'yyyy-MM-dd');
}

export function formatDateToDotFormat(date: Date): string {
    return format(date, 'dd.MM.yyyy');
}

export function formatDateToDayMonthLabel(dateString: string): string {
    const parsed = parse(dateString, 'dd.MM.yyyy', new Date());
    return format(parsed, 'd MMMM', { locale: ru });
}
