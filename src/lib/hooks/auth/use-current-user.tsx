import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/services/api/auth';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';

export const useCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.CURRENT_USER],
        queryFn: getCurrentUser,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: true,
    });
};
