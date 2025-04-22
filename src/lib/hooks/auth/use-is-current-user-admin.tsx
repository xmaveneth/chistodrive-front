import { isCurrentUserAdmin } from '@/services/api/auth';
import { useQuery } from '@tanstack/react-query';

export const useIsCurrentUserAdmin = () => {
    return useQuery({
        queryKey: ['current-user', 'is-admin'],
        queryFn: isCurrentUserAdmin,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};
