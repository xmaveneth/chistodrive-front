import { fetchReviews } from '@/services/api/carwash';
import { useMutation } from '@tanstack/react-query';

export const useCarwashReviews = (car_wash_id: number) => {
    return useMutation({
        mutationFn: (page: number) => fetchReviews(car_wash_id, page),
    });
};
