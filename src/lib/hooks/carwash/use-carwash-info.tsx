import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { getCarwashInfo } from '@/services/api/carwash';
import { useQuery } from '@tanstack/react-query';

export const useCarwashInfo = (car_wash_id: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.CARWASH_INFO, car_wash_id],
        queryFn: () => getCarwashInfo(car_wash_id),
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
};
