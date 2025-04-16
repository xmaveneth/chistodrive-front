import { fetchVehicleTypes } from '@/services/api/vehicles';
import { useQuery } from '@tanstack/react-query';

export const useVehicleTypes = () => {
    return useQuery({
        queryKey: ['vehicle-types'],
        queryFn: fetchVehicleTypes,
        staleTime: 1000 * 60 * 10,
    });
};
