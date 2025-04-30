import { BoxesResponse, ScriptBoxesResponse } from '@/lib/types/boxes';

export function createAllBoxesArray(rawBoxes: BoxesResponse | undefined) {
    if (rawBoxes == null || rawBoxes.data == null) return [];

    return rawBoxes.data.map((box) => box.name);
}

export function createSelectedBoxesArray(
    rawBoxes: ScriptBoxesResponse | undefined
) {
    if (rawBoxes == null || rawBoxes.data == null) return [];

    return rawBoxes.data.map((box) => box.name);
}

export function generateSelectedBoxIds(
    rawBoxes: BoxesResponse | undefined,
    selectedboxNames: string[]
) {
    const result: number[] = [];
    if (rawBoxes == null || rawBoxes.data == null) return result;

    selectedboxNames.forEach((boxName) => {
        const detectedbox = rawBoxes.data.find(
            (rawBox) => rawBox.name === boxName
        );

        if (detectedbox != null) {
            result.push(detectedbox.id);
        }
    });

    return result;
}
