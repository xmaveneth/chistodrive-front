import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { deleteReviewReply } from '@/services/api/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useDeleteReviewReply(closeModal: () => void) {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            reply_uuid
        }: {
            reply_uuid: string;
        }) => deleteReviewReply(reply_uuid),

        onSuccess: () => {
            notify('Комментарий к отзыву успешно удален!');
            closeModal();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CARWASH_REVIEWS],
            });
        },

        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data;
                notify(
                    typeof detail?.ru_message === 'string'
                        ? detail.ru_message
                        : 'Ошибка удаления комментария к отзыву. Попробуйте позже.'
                );
            } else {
                notify('Ошибка удаления комментария к отзыву. Попробуйте позже.');
            }
        },
    });

}

