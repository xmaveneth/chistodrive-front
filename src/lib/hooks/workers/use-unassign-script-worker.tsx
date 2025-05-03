import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { unassignScriptWorker } from '@/services/api/workers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useUnassignScriptWorker(script_id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (assignment_id: number) =>
            unassignScriptWorker(script_id, assignment_id),

        onSuccess: () => {
            notify('Сотрудник успешно отвязан от бокса!');
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
                        : 'Ошибка отвязки сотрудника. Попробуйте позже.'
                );
            } else {
                notify('Ошибка отвязки сотрудника. Попробуйте позже.');
            }
        },
    });
}
