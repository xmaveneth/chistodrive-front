import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { getCarwashServices } from "@/services/api/services";
import { useQuery } from "@tanstack/react-query";

export function useCarwashServices(car_wash_id: number) {
    return useQuery({
        queryKey: [QUERY_KEYS.CARWASH_ADMIN_SERVICES, car_wash_id],
        queryFn: () => getCarwashServices(car_wash_id),
        staleTime: 1000 * 60 * 5,
        enabled: !!car_wash_id,
    });
}
