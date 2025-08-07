import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { getCarWashServices } from "@/services/api/workers";
import { useQuery } from "@tanstack/react-query";

export const useCarWashServices = (
    car_wash_id: number,
    script_id: number | null,
    service_category_id?: number | null
  ) => {
    return useQuery({
      queryKey: [QUERY_KEYS.CARWASH_SERVICES, car_wash_id, service_category_id],
      queryFn: () => getCarWashServices(car_wash_id, script_id, service_category_id),
      staleTime: 5 * 60 * 1000, 
      enabled: !!car_wash_id,
    });
  };
