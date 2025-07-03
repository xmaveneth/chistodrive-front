import { useMutation, useQueryClient } from '@tanstack/react-query';
import notify from '@/lib/utils/notify';
import { AxiosError } from 'axios';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { deleteFavouriteCarwash } from '@/services/api/carwash';

export function useDeleteFavouriteCarwash(
    closeDialog: () => void,
    onError?: () => void
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (fav_car_wash_id: number) => deleteFavouriteCarwash(fav_car_wash_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });

            closeDialog();
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
                        : 'Произошла ошибка при удалении. Попробуйте позже.'
                );
            } else {
                notify('Произошла ошибка при удалении. Попробуйте позже.');
            }
        },
    });
}
