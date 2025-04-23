export function getWeekdayShortName(day: number): string {
    const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    return weekdays[day] ?? '';
}
