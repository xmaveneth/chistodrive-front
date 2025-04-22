import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { fetchFilters } from '@/services/api/filters';
import { useQuery } from '@tanstack/react-query';

export const useFilters = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_FILTERS],
        queryFn: fetchFilters,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
};
