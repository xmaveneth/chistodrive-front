import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { getCarwashAppointments } from '@/services/api/appointments';
import { useQuery } from '@tanstack/react-query';

export function useCarwashAppointments(car_wash_id: number) {
    return useQuery({
        queryKey: [QUERY_KEYS.CARWASH_APPOITMENTS, car_wash_id],
        queryFn: () => getCarwashAppointments(car_wash_id),
        staleTime: 1000 * 60 * 5,
        enabled: !!car_wash_id,
    });
}
