import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { fetchAdminCarwashes } from '@/services/api/carwashes-api';
import { useQuery } from '@tanstack/react-query';

export const useAdminCarwashes = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.ADMIN_CARWASHES],
        queryFn: fetchAdminCarwashes,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};
