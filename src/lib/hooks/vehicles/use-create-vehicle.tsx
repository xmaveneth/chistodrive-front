import { CreateVehiclePayload } from '@/lib/types/vehicles';
import { createVehicle } from '@/services/api/vehicles';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateVehicle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateVehiclePayload) => createVehicle(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vehicles'] });
        },
    });
};
