import { fetchSlots, SearchFilters } from '@/services/api/carwash';
import { useMutation } from '@tanstack/react-query';

export const useSearchSlots = (car_wash_id: number) => {
    return useMutation({
        mutationFn: (filters: SearchFilters) => fetchSlots(car_wash_id, filters),
    });
};
