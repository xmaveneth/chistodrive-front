import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { fetchVehicleTypes } from '@/services/api/vehicles';
import { useQuery } from '@tanstack/react-query';

export const useVehicleTypes = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.VEHICLE_TYPES],
        queryFn: fetchVehicleTypes,
        staleTime: 1000 * 60 * 10,
    });
};
