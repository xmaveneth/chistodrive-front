import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { fetchCities } from '@/services/api/cities-api';
import { useQuery } from '@tanstack/react-query';


export const useCities = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.CITIES],
        queryFn: fetchCities,
        staleTime: 1000 * 60 * 5, 
        refetchOnWindowFocus: false,
    });
};
