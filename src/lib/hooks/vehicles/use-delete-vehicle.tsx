import { useUserContext } from '@/lib/hooks/context/use-user-context';
import { deleteVehicle } from '@/services/api/vehicles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useDeleteVehicle = (closeModal: () => void) => {
    const queryClient = useQueryClient();
    const { refetch } = useUserContext();

    return useMutation({
        mutationFn: (vehicle_id: number) => deleteVehicle(vehicle_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current-user'] });
            refetch();
            toast('Авто успешно удалено!');
            closeModal();
        },
    });
};
