import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { createCarwashWorker } from '@/services/api/workers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useCreateCarwashWorker(
    car_wash_id: number,
    closeModal: () => void
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            full_name,
            job_title,
        }: {
            full_name: string;
            job_title: string;
        }) => createCarwashWorker(car_wash_id, full_name, job_title),

        onSuccess: () => {
            notify('Сотрудник успешно создан!');
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
                        : 'Ошибка создания сотрудника. Попробуйте позже.'
                );
            } else {
                notify('Ошибка создания сотрудника. Попробуйте позже.');
            }
        },
    });
}
