import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { createCarwashService } from '@/services/api/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useCreateCarwashService(
    car_wash_id: number,
    closeModal: () => void
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ name, description, service_type_id }: { name: string, description: string, service_type_id: number }) =>
            createCarwashService(car_wash_id, name, description, service_type_id),

        onSuccess: () => {
            notify('Услуга успешно создана!');
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
                        : 'Ошибка создания услуги. Попробуйте позже.'
                );
            } else {
                notify('Ошибка создания услуги. Попробуйте позже.');
            }
        },
    });
}
