import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { assignScriptWorker } from '@/services/api/workers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useAssignScriptWorker(script_id: number, closeModal: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            script_worker_id,
            script_box_id,
        }: {
            script_worker_id: number;
            script_box_id: number;
        }) => assignScriptWorker(script_id, script_worker_id, script_box_id),

        onSuccess: () => {
            notify('Сотрудник успешно привязан к боксу!');
            closeModal();
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SCRIPT_WORKERS, script_id] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ASSIGNED_WORKERS, script_id] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CAR_WASH_WORKERS, script_id] });
        },

        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка привязки сотрудника. Попробуйте позже.'
                );
            } else {
                notify('Ошибка привязки сотрудника. Попробуйте позже.');
            }
        },
    });
}
