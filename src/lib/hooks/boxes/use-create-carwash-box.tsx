import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { createCarwashBox } from '@/services/api/boxes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useCreateCarwashBox(
    car_wash_id: number,
    closeModal: () => void
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ name }: { name: string }) =>
            createCarwashBox(car_wash_id, name),

        onSuccess: () => {
            notify('Бокс успешно создан!');
            closeModal();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CAR_WASH_BOXES, car_wash_id],
            });
        },

        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка создания бокса. Попробуйте позже.'
                );
            } else {
                notify('Ошибка создания бокса. Попробуйте позже.');
            }
        },
    });
}
