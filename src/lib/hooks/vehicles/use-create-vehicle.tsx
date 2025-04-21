import { CreateVehiclePayload } from '@/lib/types/vehicles';
import notify from '@/lib/utils/notify';
import { createVehicle } from '@/services/api/vehicles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

export const useCreateVehicle = (
    setError: UseFormSetError<any>,
    closeModal: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateVehiclePayload) => createVehicle(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current-user'] });
            queryClient.invalidateQueries({ queryKey: ['vehicles'] });

            notify('Авто успешно добавлено!');
            closeModal();
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                setError('brand', {
                    message:
                        typeof detail === 'string'
                            ? detail
                            : 'Ошибка регистрации. Попробуйте позже.',
                });
            } else {
                setError('brand', {
                    message: 'Ошибка регистрации. Попробуйте позже.',
                });
            }
        },
    });
};
