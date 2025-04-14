import { fetchFilters } from '@/services/api/filters';
import { useQuery } from '@tanstack/react-query';

export const useFilters = () => {
    return useQuery({
        queryKey: ['filters'],
        queryFn: fetchFilters,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
};
