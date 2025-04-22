import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import {
    makeAppointment,
    MakeAppointmentPayload,
} from '@/services/api/carwashes-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useMakeAppointment(closeDialog: () => void) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (payload: MakeAppointmentPayload) =>
            makeAppointment(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
            closeDialog();
            notify('Запись успешно произведена!');
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail === 'string'
                        ? detail
                        : 'Ошибка добавления записи. Попробуйте позже.'
                );
            } else {
                notify('Ошибка добавления записи. Попробуйте позже.');
            }
        },
    });
}
