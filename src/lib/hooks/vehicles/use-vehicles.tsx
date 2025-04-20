import { Car, VehicleTypeMap } from '@/lib/types/user';
import { fetchVehicles } from '@/services/api/vehicles';
import { useQuery } from '@tanstack/react-query';

export const useGroupedVehicles = () => {
    return useQuery<VehicleTypeMap>({
        queryKey: ['vehicles', 'grouped'],
        queryFn: () => fetchVehicles(true),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};

export const useFlatVehicles = () => {
    return useQuery<Car[]>({
        queryKey: ['vehicles', 'flat'],
        queryFn: () => fetchVehicles(false),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};