import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { deleteScriptVersion } from '@/services/api/scripts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useDeleteScriptVersion(closeDialog: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (script_version_id: number) =>
            deleteScriptVersion(script_version_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SCRIPTS] });
            notify('Версия скрипта успешно удалена!');
            closeDialog();
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка удаления версии скрипта. Попробуйте позже.'
                );
            } else {
                notify('Ошибка удаления версии скрипта. Попробуйте позже.');
            }
        },
    });
}
