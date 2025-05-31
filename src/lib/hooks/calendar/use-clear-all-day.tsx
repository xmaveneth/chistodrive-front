import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { clearAllCalendarDay } from '@/services/api/calendar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useClearAllDay(closeDialog: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            car_wash_id,
            date_field,
        }: {
            car_wash_id: number;
            date_field: string;
        }) => clearAllCalendarDay(car_wash_id, date_field),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.ADMIN_CALENDAR],
            });
            notify('Данные успешно очищены!');
            closeDialog();
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка очистки данных по дню. Попробуйте позже.'
                );
            } else {
                notify('Ошибка очистки данных по дню. Попробуйте позже.');
            }
        },
    });
}
