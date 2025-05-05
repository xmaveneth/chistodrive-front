import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { createScriptInterval } from '@/services/api/intervals';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type Params = {
    script_id: number;
    service_param_id: number;
    start_time: string;
    end_time: string;
};

export function useCreateScriptInterval(closeDialog: () => void) {
    const queryClient = useQueryClient();

    return useMutation<string, Error, Params>({
        mutationFn: ({ script_id, service_param_id, start_time, end_time }) =>
            createScriptInterval(
                script_id,
                service_param_id,
                start_time,
                end_time
            ),

        onSuccess: (_data, { script_id }) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SCRIPT_INTERVALS, script_id],
            });
            notify('Интервал успешно добавлен!');
            closeDialog();
        },

        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка добавления интервала. Попробуйте позже.'
                );
            } else {
                notify('Ошибка добавления интервала. Попробуйте позже.');
            }
        },
    });
}
