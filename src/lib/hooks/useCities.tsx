import { fetchCities } from '@/services/api/cities-api';
import { useQuery } from '@tanstack/react-query';


export const useCities = () => {
    return useQuery({
        queryKey: ['cities'],
        queryFn: fetchCities,
        staleTime: 1000 * 60 * 5, 
        refetchOnWindowFocus: false,
    });
};
