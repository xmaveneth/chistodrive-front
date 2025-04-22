import { useMutation, useQueryClient } from '@tanstack/react-query';
import notify from '@/lib/utils/notify';
import { AxiosError } from 'axios';
import { deleteFavouriteSlot } from '@/services/api/carwashes-api';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';

export function useDeleteFavouriteSlot(
    closeDialog: () => void,
    shouldNotify: boolean = true,
    onError?: () => void
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (fav_slot_id: number) => deleteFavouriteSlot(fav_slot_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });

            closeDialog();
            if (shouldNotify) {
                notify('Запись успешно удалена!');
            }
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
