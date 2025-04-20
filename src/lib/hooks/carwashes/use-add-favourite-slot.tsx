import notify from '@/lib/utils/notify';
import { addFavouriteSlot } from '@/services/api/carwashes-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useAddFavouriteSlot(onSuccess?: () => void, onError?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (slot_id: number) => addFavouriteSlot(slot_id),
        onSuccess: () => {
            if (onSuccess) {
                onSuccess();
            }
            queryClient.invalidateQueries({ queryKey: ['current-user'] });
        },
        onError: (error: unknown) => {
            if (onError) {
                onError();
            }
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail === 'string'
                        ? detail
                        : 'Произошла ошибка. Попробуйте позже.'
                );
            } else {
                notify('Произошла ошибка. Попробуйте позже.');
            }
        },
    });
}
