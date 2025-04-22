import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { Car, VehicleTypeMap } from '@/lib/types/user';
import { fetchVehicles } from '@/services/api/vehicles';
import { useQuery } from '@tanstack/react-query';

export const useGroupedVehicles = () => {
    return useQuery<VehicleTypeMap>({
        queryKey: [QUERY_KEYS.USER_VEHICLES, QUERY_KEYS.GROUPED],
        queryFn: () => fetchVehicles(true),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};

export const useFlatVehicles = () => {
    return useQuery<Car[]>({
        queryKey: [QUERY_KEYS.USER_VEHICLES, QUERY_KEYS.FLAT],
        queryFn: () => fetchVehicles(false),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};