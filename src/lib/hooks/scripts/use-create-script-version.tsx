import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { createScriptVersion } from '@/services/api/scripts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useCreateScriptVersion(closeDialog: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            script_id,
            name,
        }: {
            script_id: number;
            name: string;
        }) => createScriptVersion(script_id, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SCRIPTS] });
            notify('Версия скрипта успешно создана!');
            closeDialog();
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка создания версии скрипта. Попробуйте позже.'
                );
            } else {
                notify('Ошибка создания версии скрипта. Попробуйте позже.');
            }
        },
    });
}
