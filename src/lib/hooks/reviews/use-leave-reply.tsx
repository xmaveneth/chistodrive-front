
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { createReviewReply } from '@/services/api/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useLeaveReply(closeModal: () => void) {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ review_uuid, comment }: { review_uuid: string, comment: string }) =>
            createReviewReply(review_uuid, comment),

        onSuccess: () => {
            notify('Ответ на отзыв успешно оставлен!');
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
                        : 'Ошибка оставления ответа на отзыв. Попробуйте позже.'
                );
            } else {
                notify('Ошибка оставления ответа на отзыв. Попробуйте позже.');
            }
        },
    });

}

