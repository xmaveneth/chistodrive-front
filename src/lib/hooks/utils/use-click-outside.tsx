import { RefObject } from 'react';
import useEventListener from '@/lib/hooks/utils/use-event-listener';

export default function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T | null>,
    cb: (event: MouseEvent | Event | MediaQueryListEvent) => void
): void {
    useEventListener(
        'click',
        (e: MouseEvent | Event | MediaQueryListEvent) => {
            if (ref.current == null || ref.current.contains(e.target as Node))
                return;
            cb(e);
        },
        document
    );
}
