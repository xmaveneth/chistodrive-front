import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { updateScriptBoxes } from '@/services/api/boxes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useUpdateScriptBoxes(script_id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (boxIds: number[]) => updateScriptBoxes(script_id, boxIds),
        onSuccess: () => {
            notify('Боксы успешно обновлены!');
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SCRIPT_BOXES, script_id],
            });
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка обновления боксов. Попробуйте позже.'
                );
            } else {
                notify('Ошибка обновления боксов. Попробуйте позже.');
            }
        },
    });
}
