function getPluralForm(n: number): 'one' | 'few' | 'many' {
    const lastDigit = n % 10;
    const lastTwoDigits = n % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) return 'one';
    if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits))
        return 'few';
    return 'many';
}

export function pluralizeMaster(n: number): string {
    const form = getPluralForm(n);
    const word =
        form === 'one' ? 'мастер' : form === 'few' ? 'мастера' : 'мастеров';

    return `${n} ${word}`;
}

export function pluralizeBox(n: number): string {
    const form = getPluralForm(n);
    const word = form === 'one' ? 'бокс' : form === 'few' ? 'бокса' : 'боксов';

    return `${n} ${word}`;
}

export function pluralizeReview(n: number): string {
    const form = getPluralForm(n);
    const word = form === 'one' ? 'отзыв' : form === 'few' ? 'отзыва' : 'отзывов';

    return `${n} ${word}`;
}
