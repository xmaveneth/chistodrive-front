import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { launchScriptVersion } from '@/services/api/script-versions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useLaunchScriptVersion(closeDialog: () => void, carWashId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ script_version_id }: { script_version_id: number }) =>
            launchScriptVersion(script_version_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SCRIPTS, carWashId] });
            notify('Версия скрипта успешно запущена в работу!');
            closeDialog();
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data;
                notify(
                    Array.isArray(detail?.ru_message) &&
                        detail.ru_message.length > 0
                        ? detail.ru_message[0]
                        : 'Ошибка перевода версии скрипта в работу. Попробуйте позже.'
                );
            } else {
                notify('Ошибка перевода версии скрипта в работу. Попробуйте позже.');
            }
        },
    });
}
