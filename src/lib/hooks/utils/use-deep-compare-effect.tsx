import { useEffect, useRef } from 'react';
import isEqual from 'lodash/fp/isEqual';

export default function useDeepCompareEffect(
    callback: () => void | (() => void),
    dependencies: unknown[]
): void {
    const currentDependenciesRef = useRef<unknown[] | null>(null);

    if (!isEqual(currentDependenciesRef.current, dependencies)) {
        currentDependenciesRef.current = dependencies;
    }

    useEffect(callback, [currentDependenciesRef.current]);
}
