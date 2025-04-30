import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { getScriptWorkers } from '@/services/api/workers';
import { useQuery } from '@tanstack/react-query';

export function useScriptWorkers(script_id: number) {
    return useQuery({
        queryKey: [QUERY_KEYS.SCRIPT_WORKERS, script_id],
        queryFn: () => getScriptWorkers(script_id),
        staleTime: 1000 * 60 * 5,
        enabled: !!script_id,
    });
}
