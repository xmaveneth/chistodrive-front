
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import {  getFilterValues } from '@/services/api/appointments';
import { useQuery } from '@tanstack/react-query';

export function useFilterValues(car_wash_id: number) {
    return useQuery({
        queryKey: [QUERY_KEYS.APPOINTMENT_FILTERS, car_wash_id],
        queryFn: () => getFilterValues(car_wash_id),
        staleTime: 1000 * 60 * 5,
        enabled: !!car_wash_id,
    });
}
