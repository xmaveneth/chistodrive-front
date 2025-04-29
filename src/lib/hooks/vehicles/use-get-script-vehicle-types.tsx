import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { getScriptVehicleTypes } from '@/services/api/vehicles';
import { useQuery } from '@tanstack/react-query';

export function useGetScriptVehicleTypes(script_id: number) {
    return useQuery({
        queryKey: [QUERY_KEYS.SCRIPT_VEHICLE_TYPES, script_id],
        queryFn: () => getScriptVehicleTypes(script_id),
        staleTime: 1000 * 60 * 5,
        enabled: !!script_id,
    });
}
