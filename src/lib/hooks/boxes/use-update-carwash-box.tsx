import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { updateCarwashBox } from '@/services/api/boxes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useUpdateCarwashBox(
    car_wash_id: number,
    closeModal: () => void
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ name, id }: { name: string; id: number }) =>
            updateCarwashBox(car_wash_id, id, name),

        onSuccess: () => {
            notify('Бокс успешно обновлен!');
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
                        : 'Ошибка обновления бокса. Попробуйте позже.'
                );
            } else {
                notify('Ошибка обновления бокса. Попробуйте позже.');
            }
        },
    });
}
