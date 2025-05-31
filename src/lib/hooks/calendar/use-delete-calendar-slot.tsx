
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { deleteCalendarSlot } from '@/services/api/calendar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useDeleteCalendarSlot(closeDialog: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            slot_id,
            car_wash_id
        }: {
            slot_id: number;
            car_wash_id: number;
        }) => deleteCalendarSlot(slot_id, car_wash_id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.ADMIN_CALENDAR],
            });
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
