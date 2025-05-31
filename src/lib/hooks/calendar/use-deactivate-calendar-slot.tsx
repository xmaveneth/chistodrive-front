import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { deactivateCalendarSlot } from '@/services/api/calendar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useDeactivateCalendarSlot(closeDialog: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            date,
            car_wash_id,
        }: {
            date: string;
            car_wash_id: number;
        }) => deactivateCalendarSlot(date, car_wash_id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.ADMIN_CALENDAR],
            });
            notify('Слоты успешно деактивированы!');
            closeDialog();
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка деактивирования слота. Попробуйте позже.'
                );
            } else {
                notify('Ошибка деактивирования слота. Попробуйте позже.');
            }
        },
    });
}
