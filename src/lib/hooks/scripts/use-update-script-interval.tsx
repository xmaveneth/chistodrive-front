import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import notify from '@/lib/utils/notify';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { UpdateScriptIntervalParams } from '@/lib/types/intervals';
import { updateScriptInterval } from '@/services/api/intervals';

export function useUpdateScriptInterval(closeDialog: () => void) {
    const queryClient = useQueryClient();

    return useMutation<string, Error, UpdateScriptIntervalParams>({
        mutationFn: ({ script_id, interval_id, price, workers, boxes }) =>
            updateScriptInterval(script_id, interval_id, price, workers, boxes),

        onSuccess: (_data, { script_id }) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SCRIPT_INTERVALS, script_id],
            });
            notify('Интервал успешно обновлён!');
            closeDialog();
        },

        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка обновления интервала. Попробуйте позже.'
                );
            } else {
                notify('Ошибка обновления интервала. Попробуйте позже.');
            }
        },
    });
}
