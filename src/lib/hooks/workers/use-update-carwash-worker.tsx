import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { updateCarwashWorker } from '@/services/api/workers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useUpdateCarwashWorker(
    car_wash_id: number,
    closeModal: () => void
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            full_name,
            job_title,
            telephone,
        }: {
            id: number;
            full_name: string;
            job_title: string;
            telephone: string;
        }) =>
            updateCarwashWorker(
                car_wash_id,
                id,
                full_name,
                job_title,
                telephone
            ),

        onSuccess: () => {
            notify('Сотрудник успешно обновлен!');
            closeModal();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CAR_WASH_WORKERS, car_wash_id],
            });
        },

        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка обновления сотрудника. Попробуйте позже.'
                );
            } else {
                notify('Ошибка обновления сотрудника. Попробуйте позже.');
            }
        },
    });
}
