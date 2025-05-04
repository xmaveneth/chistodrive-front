import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { deleteScriptService } from '@/services/api/scripts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useDeleteScriptService(script_id: number, closeDialog: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (script_service_id: number) =>
            deleteScriptService(script_id, script_service_id),

        onSuccess: () => {
            notify('Услуга успешно удалена!');
            closeDialog();
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
                        : 'Ошибка удаления услуги. Попробуйте позже.'
                );
            } else {
                notify('Ошибка удаления услуги. Попробуйте позже.');
            }
        },
    });
}
