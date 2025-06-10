import { postReview } from '@/services/api/review';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function usePostReview(closeModal: () => void) {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postReview,

        onSuccess: () => {
            notify('Спасибо что оставили отзыв!');
            closeModal();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.REVIEWS],
            });
        },

        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data;
                notify(
                    typeof detail?.ru_message === 'string'
                        ? detail.ru_message
                        : 'Ошибка создания отзыва. Попробуйте позже.'
                );
            } else {
                notify('Ошибка создания отзыва. Попробуйте позже.');
            }
        },
    });

}

