import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { getScriptServiceParams } from '@/services/api/scripts';
import { useQuery } from '@tanstack/react-query';

export function useGetScriptServiceParams(script_id: number) {
    return useQuery({
        queryKey: [QUERY_KEYS.SCRIPT_SERVICE_PARAMS, script_id],
        queryFn: () => getScriptServiceParams(script_id),
        staleTime: 1000 * 60 * 5,
        enabled: !!script_id,
    });
}
