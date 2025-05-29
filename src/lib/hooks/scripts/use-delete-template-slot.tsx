import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { deleteScriptVersionInfo } from '@/services/api/script-versions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useDeleteTemplateSlot(closeDialog: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            script_version_id,
            template_slot_id,
        }: {
            script_version_id: number;
            template_slot_id: number;
        }) => deleteScriptVersionInfo(script_version_id, template_slot_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SCRIPTS] });
            notify('Слот успешно удален!');
            closeDialog();
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка удаления слота. Попробуйте позже.'
                );
            } else {
                notify('Ошибка удаления слота. Попробуйте позже.');
            }
        },
    });
}
