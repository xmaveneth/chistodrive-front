import notify from '@/lib/utils/notify';
import { deleteVehicle } from '@/services/api/vehicles';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteVehicle = (closeModal: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (vehicle_id: number) => deleteVehicle(vehicle_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current-user'] });
            notify('Авто успешно удалено!');
            closeModal();
        },
    });
};
