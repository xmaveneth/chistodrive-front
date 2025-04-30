import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { getCarWashWorkers } from '@/services/api/workers';
import { useQuery } from '@tanstack/react-query';

export function useCarWashWorkers(car_wash_id: number) {
    return useQuery({
        queryKey: [QUERY_KEYS.CAR_WASH_WORKERS, car_wash_id],
        queryFn: () => getCarWashWorkers(car_wash_id),
        staleTime: 1000 * 60 * 5,
        enabled: !!car_wash_id,
    });
}
