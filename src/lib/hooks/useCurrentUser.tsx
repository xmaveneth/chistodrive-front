import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/services/api/auth';

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['current-user'],
        queryFn: getCurrentUser,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: false,
    });
};
