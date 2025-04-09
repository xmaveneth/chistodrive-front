const defaultDateOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'full',
    timeStyle: 'short',
};

export function formatDate(date: Date, options = defaultDateOptions) {
    return new Intl.DateTimeFormat(undefined, options).format(date);
}
