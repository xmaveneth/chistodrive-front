import { useMutation } from '@tanstack/react-query';
import { fetchServices, SearchFilters } from '@/services/api/search-services';

export const useSearchServices = () => {
    return useMutation({
        mutationFn: (filters: SearchFilters) => fetchServices(filters),
    });
};
