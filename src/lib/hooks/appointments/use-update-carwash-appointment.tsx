import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { updateCarwashAppointment } from '@/services/api/appointments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useUpdateCarwashAppointment(
    car_wash_id: number,
    closeModal: () => void
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            appointment_id,
            status_id,
        }: {
            appointment_id: number;
            status_id: number;
        }) => updateCarwashAppointment(car_wash_id, appointment_id, status_id),

        onSuccess: () => {
            notify('Статус успешно обновлен!');
            closeModal();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CARWASH_APPOITMENTS, car_wash_id],
            });
        },

        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка обновления статуса. Попробуйте позже.'
                );
            } else {
                notify('Ошибка обновления статуса. Попробуйте позже.');
            }
        },
    });
}
