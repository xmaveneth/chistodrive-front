
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { deleteReview } from '@/services/api/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useDeleteReview(closeModal: () => void) {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            review_uuid
        }: {
            review_uuid: string;
        }) => deleteReview(review_uuid),

        onSuccess: () => {
            notify('Отзыв успешно удален!');
            closeModal();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.REVIEWS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CURRENT_USER],
            });
        },

        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data;
                notify(
                    typeof detail?.ru_message === 'string'
                        ? detail.ru_message
                        : 'Ошибка удаления отзыва. Попробуйте позже.'
                );
            } else {
                notify('Ошибка удаления отзыва. Попробуйте позже.');
            }
        },
    });

}

