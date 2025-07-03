import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { addFavouriteCarwash } from '@/services/api/carwash';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useAddFavouriteCarwash(onSuccess?: () => void, onError?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (car_wash_id: number) => addFavouriteCarwash(car_wash_id),
        onSuccess: () => {
            if (onSuccess) {
                onSuccess();
            }
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
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
