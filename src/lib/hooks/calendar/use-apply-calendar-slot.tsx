import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { applyCalendarSlot } from '@/services/api/calendar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useApplyCalendarSlot() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            date,
            script_version_id,
        }: {
            date: string;
            script_version_id: number;
        }) => applyCalendarSlot(date, script_version_id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.ADMIN_CALENDAR],
            });
            notify('Версия скрипта успешно применена!');
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка применения версии скрипта. Попробуйте позже.'
                );
            } else {
                notify('Ошибка применения версии скрипта. Попробуйте позже.');
            }
        },
    });
}
