import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { ScheduleIntervalsResponse } from '@/lib/types/intervals';
import { getScriptIntervals } from '@/services/api/intervals';
import { useQuery } from '@tanstack/react-query';

export const useScriptIntervals = (script_id: number) => {
    return useQuery<ScheduleIntervalsResponse>({
        queryKey: [QUERY_KEYS.SCRIPT_INTERVALS, script_id],
        queryFn: () => getScriptIntervals(script_id),
        enabled: !!script_id,
        staleTime: 5 * 60 * 1000,
    });
};
