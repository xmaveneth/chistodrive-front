
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { getCalendarData } from "@/services/api/calendar";
import { useQuery } from "@tanstack/react-query";

export const useCalendarData = (
    car_wash_id: number,
    date_field: string 
  ) => {
    return useQuery({
      queryKey: [QUERY_KEYS.ADMIN_CALENDAR, car_wash_id, date_field],
      queryFn: () => getCalendarData(car_wash_id, date_field),
      staleTime: 5 * 60 * 1000, 
      enabled: !!car_wash_id,
    });
  };
