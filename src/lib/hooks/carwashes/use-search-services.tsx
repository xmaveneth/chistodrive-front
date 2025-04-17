import { useMutation } from '@tanstack/react-query';
import { fetchServices, SearchFilters } from '@/services/api/search-services';

export const useSearchServices = () => {
    return useMutation({
        mutationFn: (filters: SearchFilters) => fetchServices(filters),
    });
};


/* export const useInfiniteSearchServices = (filters: SearchFilters) => {
    return useInfiniteQuery({
        queryKey: ['services', filters],
        queryFn: ({ pageParam = 0 }) => fetchServices(filters, pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const hasMore = (lastPage.page + 1) < lastPage.total; // adjust 10 if per-page limit differs
            return hasMore ? lastPage.page + 1 : undefined;
        },
        staleTime: 0,
        enabled: !!filters.city_id, // prevent auto-run if not ready
    });
};
 */