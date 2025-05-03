import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { updateScriptWorkers } from '@/services/api/workers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useUpdateScriptWorkers(script_id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (workerIds: number[]) =>
            updateScriptWorkers(script_id, workerIds),
        onSuccess: () => {
            notify('Сотрудники успешно обновлены!');
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
                        : 'Ошибка обновления сотрудников. Попробуйте позже.'
                );
            } else {
                notify('Ошибка обновления сотрудников. Попробуйте позже.');
            }
        },
    });
}
