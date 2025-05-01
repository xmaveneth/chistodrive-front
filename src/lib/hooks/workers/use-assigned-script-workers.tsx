import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { getAssignedScriptWorkers } from '@/services/api/workers';
import { useQuery } from '@tanstack/react-query';

export function useAssignedScriptWorkers(script_id: number) {
    return useQuery({
        queryKey: [QUERY_KEYS.ASSIGNED_WORKERS, script_id],
        queryFn: () => getAssignedScriptWorkers(script_id),
        staleTime: 1000 * 60 * 5,
        enabled: !!script_id,
    });
}
