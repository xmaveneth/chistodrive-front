import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { updateCarwashSchedule } from '@/services/api/carwashes-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateCarwashSchedule = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCarwashSchedule,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.ADMIN_CARWASH],
            });
        },
    });
};
