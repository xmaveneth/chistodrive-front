import { deleteVehicle } from '@/services/api/vehicles';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteVehicle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (vehicle_id: number) => deleteVehicle(vehicle_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vehicles'] });
        },
    });
};
