import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import notify from '@/lib/utils/notify';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { deleteScriptInterval } from '@/services/api/intervals';

type Params = {
    script_id: number;
    interval_id: number;
};

export function useDeleteScriptInterval(closeDialog: () => void) {
    const queryClient = useQueryClient();

    return useMutation<string, Error, Params>({
        mutationFn: ({ script_id, interval_id }) =>
            deleteScriptInterval(script_id, interval_id),

        onSuccess: (_data, { script_id }) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SCRIPT_INTERVALS, script_id],
            });
            notify('Интервал успешно удалён!');
            closeDialog();
        },

        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка удаления интервала. Попробуйте позже.'
                );
            } else {
                notify('Ошибка удаления интервала. Попробуйте позже.');
            }
        },
    });
}
