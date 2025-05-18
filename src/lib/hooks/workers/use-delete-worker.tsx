import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import notify from '@/lib/utils/notify';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { deleteCarwashWorker } from '@/services/api/workers';

type Params = {
    car_wash_id: number;
    id: number;
};

export function useDeleteCarwashWorker(car_wash_id: number, closeDialog: () => void) {
    const queryClient = useQueryClient();

    return useMutation<string, Error, Params>({
        mutationFn: ({ id }) =>
            deleteCarwashWorker(car_wash_id, id),

        onSuccess: (_data, { car_wash_id }) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CAR_WASH_WORKERS, car_wash_id],
            });
            notify('Сотрудник успешно удалён!');
            closeDialog();
        },

        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка удаления сотрудника. Попробуйте позже.'
                );
            } else {
                notify('Ошибка удаления сотрудника. Попробуйте позже.');
            }
        },
    });
}
