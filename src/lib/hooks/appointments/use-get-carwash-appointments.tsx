import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { FiltersPayload } from '@/lib/types/appointments';
import { getCarwashAppointments } from '@/services/api/appointments';

export function useCarwashAppointments(car_wash_id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QUERY_KEYS.CARWASH_APPOITMENTS, car_wash_id],
        mutationFn: (payload: FiltersPayload) =>
            getCarwashAppointments(car_wash_id, payload),
        onSuccess: (data) => {
            queryClient.setQueryData(
                [QUERY_KEYS.CARWASH_APPOITMENTS, car_wash_id],
                data
            );
        },
    });
}
