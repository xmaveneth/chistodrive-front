import notify from '@/lib/utils/notify';
import {
    makeAppointment,
    MakeAppointmentPayload,
} from '@/services/api/carwashes-api';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useMakeAppointment(closeDialog: () => void) {
    return useMutation({
        mutationFn: (payload: MakeAppointmentPayload) =>
            makeAppointment(payload),
        onSuccess: () => {
            closeDialog();
            notify("Запись успешно произведена!");
        },
        onError: (error: unknown) => {
                    if (error instanceof AxiosError && error.response) {
                        const detail = error.response.data?.detail;
                        notify(typeof detail === 'string'
                            ? detail
                            : 'Ошибка добавления записи. Попробуйте позже.');
                    } else {
                        notify('Ошибка добавления записи. Попробуйте позже.');
                    }
                },
    });
}
