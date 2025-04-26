import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { deleteScript } from '@/services/api/scripts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useDeleteScript(closeDialog: () => void) {
    const queryClient = useQueryClient();

    return useMutation<string, Error, { script_id: number }>({
        mutationFn: ({ script_id }) => deleteScript(script_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SCRIPTS] });
            notify('Скрипт успешно удален!');
            closeDialog();
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail.msg === 'string'
                        ? detail.msg
                        : 'Ошибка удаления скрипта. Попробуйте позже.'
                );
            } else {
                notify('Ошибка удаления скрипта. Попробуйте позже.');
            }
        },
    });
}
