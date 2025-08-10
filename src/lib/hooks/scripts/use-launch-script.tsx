import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { launchScript } from '@/services/api/scripts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useLaunchScript(closeDialog: () => void, carWashId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ script_id }: { script_id: number }) =>
            launchScript(script_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SCRIPTS, carWashId] });
            notify('Скрипт успешно запущен в работу!');
            closeDialog();
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data;
                notify(
                    Array.isArray(detail?.ru_message) &&
                        detail.ru_message.length > 0
                        ? detail.ru_message[0]
                        : 'Ошибка перевода скрипта в работу. Попробуйте позже.'
                );
            } else {
                notify('Ошибка перевода скрипта в работу. Попробуйте позже.');
            }
        },
    });
}
