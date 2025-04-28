export function generateColumnClass(columnCount: number) {
    const sizes = ['60px'];

    for (let i = 0; i < columnCount; i++) {
        sizes.push('1fr');
    }

    sizes.push('60px');
    return sizes.join(' ');
}

const WIDTH_PER_COLUMN = 270;

export function calculateTableWidth(columnCount: number) {
    return 60 * 2 + columnCount * WIDTH_PER_COLUMN;
}