
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { ScriptVersionSlotsResponse } from '@/lib/types/script-version';
import { getScriptVersionInfo } from '@/services/api/script-versions';
import { useQuery } from '@tanstack/react-query';

export function useScriptVersion(script_version_id: number) {
    return useQuery<ScriptVersionSlotsResponse>({
        queryKey: [QUERY_KEYS.SCRIPTS, script_version_id],
        queryFn: () => getScriptVersionInfo(script_version_id),
        staleTime: 1000 * 60 * 5,
        enabled: !!script_version_id,
    });
}
