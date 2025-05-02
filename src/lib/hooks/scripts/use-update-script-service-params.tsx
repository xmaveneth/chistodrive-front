import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { UpdateServiceParamsRequest } from '@/lib/types/service-params';
import notify from '@/lib/utils/notify';
import { updateScriptServiceParams } from '@/services/api/scripts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useUpdateScriptServiceParams(script_id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateServiceParamsRequest) =>
            updateScriptServiceParams(script_id, data),

        onSuccess: () => {
            notify('Параметры услуги успешно обновлены!');
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
                        : 'Ошибка обновления параметров услуги. Попробуйте позже.'
                );
            } else {
                notify(
                    'Ошибка обновления параметров услуги. Попробуйте позже.'
                );
            }
        },
    });
}
