import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';

const defaultDateOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'full',
    timeStyle: 'short',
};

export function formatDate(date: Date, options = defaultDateOptions) {
    return new Intl.DateTimeFormat(undefined, options).format(date);
}

export function formatDateForReviews(dateString: string): string {
    const parsed = parse(dateString, 'yyyy-MM-dd', new Date());
    return format(parsed, 'd MMMM yyyy', { locale: ru });
}

/* export function formatDateFromString(date: string) {
    return format(parse(date, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd');
}

export function formatDateToDotFormat(date: Date): string {
    return format(date, 'dd-MM-yyyy');
}

export function formatDateToDayMonthLabel(dateString: string): string {
    const parsed = parse(dateString, 'dd-MM-yyyy', new Date());
    return format(parsed, 'd MMMM', { locale: ru });
}
 */

export function formatDateToString(date: Date): string {
    return format(date, 'yyyy-MM-dd');
}

export function formatDateToRussianFormat(date: Date): string {
    return format(date, 'dd-MM-yyyy');
}

export function formatDateToDayMonthLabel(dateString: string): string {
    const parsed = parse(dateString, 'yyyy-MM-dd', new Date());
    return format(parsed, 'd MMMM', { locale: ru });
}

export function formatDateToHumanFormat(dateString: string): string {
    const parsed = parse(dateString, 'yyyy-MM-dd', new Date());
    return format(parsed, 'd MMMM', { locale: ru });
}

export function formatDateForScripts(isoDate: string): string {
    return new Intl.DateTimeFormat('ru-RU').format(new Date(isoDate));
}

export function formatTimeToHHMM(time: string | null | undefined): string {
    if (time == null) return '';
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
}

export function getCurrentClientTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return formatTimeToHHMM(timeString);
}
