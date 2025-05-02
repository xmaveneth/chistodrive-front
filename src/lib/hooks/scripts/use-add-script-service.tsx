import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { addScriptService } from '@/services/api/scripts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useAddScriptService(script_id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (service_id: number) =>
            addScriptService(script_id, service_id),

        onSuccess: () => {
            notify('Услуга успешно добавлена!');
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SCRIPT_SERVICE_PARAMS, script_id],
            });
        },

        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка добавления услуги. Попробуйте позже.'
                );
            } else {
                notify('Ошибка добавления услуги. Попробуйте позже.');
            }
        },
    });
}
