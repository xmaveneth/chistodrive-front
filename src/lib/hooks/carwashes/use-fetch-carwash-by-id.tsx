import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { fetchCarwashById } from '@/services/api/carwashes-api';
import { useQuery } from '@tanstack/react-query';

export const useCarwashById = (id: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.ADMIN_CARWASH, id],
        queryFn: () => fetchCarwashById(id),
        enabled: !!id,
    });
};
