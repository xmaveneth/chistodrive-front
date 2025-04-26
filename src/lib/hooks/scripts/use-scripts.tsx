import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { ScriptsResponse } from '@/lib/types/scripts';
import { fetchScripts } from '@/services/api/scripts';
import { useQuery } from '@tanstack/react-query';

export function useScripts(carWashId: number) {
    return useQuery<ScriptsResponse>({
        queryKey: [QUERY_KEYS.SCRIPTS, carWashId],
        queryFn: () => fetchScripts(carWashId),
        enabled: !!carWashId,
    });
}
