import { CarwashSlotsContext } from '@/lib/providers/carwash-slots-provider';
import { useContext } from 'react';

export default function useSearchSlotsContext() {
    const carwashSlotsContext = useContext(CarwashSlotsContext);

    if (carwashSlotsContext == null) {
        throw new Error('Must be within provider');
    }

    return carwashSlotsContext;
}
