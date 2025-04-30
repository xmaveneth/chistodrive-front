import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { getScriptBoxes } from '@/services/api/boxes';
import { useQuery } from '@tanstack/react-query';

export function useScriptBoxes(script_id: number) {
    return useQuery({
        queryKey: [QUERY_KEYS.SCRIPT_BOXES, script_id],
        queryFn: () => getScriptBoxes(script_id),
        staleTime: 1000 * 60 * 5,
        enabled: !!script_id,
    });
}
