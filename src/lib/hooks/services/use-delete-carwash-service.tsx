import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { deleteCarwashService } from '@/services/api/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useDeleteCarwashService(
    car_wash_id: number,
    closeModal: () => void
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ service_id }: { service_id: number }) =>
            deleteCarwashService(car_wash_id, service_id),

        onSuccess: () => {
            notify('Услуга успешно удалена!');
            closeModal();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CARWASH_ADMIN_SERVICES, car_wash_id],
            });
        },

        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка удаления услуги. Попробуйте позже.'
                );
            } else {
                notify('Ошибка удаления услуги. Попробуйте позже.');
            }
        },
    });
}
