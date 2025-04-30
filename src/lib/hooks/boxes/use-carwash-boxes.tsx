import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { getCarWashBoxes } from '@/services/api/boxes';
import { useQuery } from '@tanstack/react-query';

export function useCarWashBoxes(car_wash_id: number) {
    return useQuery({
        queryKey: [QUERY_KEYS.CAR_WASH_BOXES, car_wash_id],
        queryFn: () => getCarWashBoxes(car_wash_id),
        staleTime: 1000 * 60 * 5,
        enabled: !!car_wash_id,
    });
}
