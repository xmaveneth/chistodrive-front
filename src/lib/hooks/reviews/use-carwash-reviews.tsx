import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { getReviews } from '@/services/api/review';
import { useQuery } from '@tanstack/react-query';

export function useCarwashReviews(car_wash_id: number) {
    return useQuery({
        queryKey: [QUERY_KEYS.CARWASH_REVIEWS, car_wash_id],
        queryFn: () => getReviews(car_wash_id),
        staleTime: 1000 * 60 * 5,
        enabled: !!car_wash_id,
    });
}
