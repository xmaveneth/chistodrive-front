import notify from '@/lib/utils/notify';
import { deleteAppointment } from '@/services/api/carwashes-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useDeleteAppointment(closeDialog: () => void) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (appointment_id: number) =>
            deleteAppointment(appointment_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current-user'] });
            
            closeDialog();
            notify('Запись успешно удалена!');
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail === 'string'
                        ? detail
                        : 'Ошибка удаления записи. Попробуйте позже.'
                );
            } else {
                notify('Ошибка удаления записи. Попробуйте позже.');
            }
        },
    });
}
