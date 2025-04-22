import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { deleteVehicle } from '@/services/api/vehicles';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteVehicle = (closeModal: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (vehicle_id: number) => deleteVehicle(vehicle_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_VEHICLES] });
            notify('Авто успешно удалено!');
            closeModal();
        },
    });
};
