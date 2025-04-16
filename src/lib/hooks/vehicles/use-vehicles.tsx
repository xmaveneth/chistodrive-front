import { fetchVehicles } from '@/services/api/vehicles';
import { useQuery } from '@tanstack/react-query';

export const useVehicles = () => {
    return useQuery({
        queryKey: ['vehicles'],
        queryFn: fetchVehicles,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};
