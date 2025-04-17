import { useUserContext } from '@/lib/hooks/context/use-user-context';
import { CreateVehiclePayload } from '@/lib/types/vehicles';
import { createVehicle } from '@/services/api/vehicles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useCreateVehicle = (
    setError: UseFormSetError<any>,
    closeModal: () => void
) => {
    const queryClient = useQueryClient();
    const { refetch } = useUserContext();

    return useMutation({
        mutationFn: (payload: CreateVehiclePayload) => createVehicle(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current-user'] });
            refetch();

            toast('Авто успешно добавлено!');
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
