import { ScriptVersionSlotsResponse } from '@/lib/types/script-version';
import { axiosInstance } from './axios-instance';

export async function getScriptVersionInfo(
    script_version_id: number
): Promise<ScriptVersionSlotsResponse> {
    const response = await axiosInstance.get<ScriptVersionSlotsResponse>(
        `api/script_version/${script_version_id}/template_slots`
    );

    return response.data;
}

export async function deleteScriptVersionInfo(
    script_version_id: number,
    template_slot_id: number
): Promise<string> {
    const response = await axiosInstance.delete<string>(
        `api/script_version/${script_version_id}/template_slots`,
        {
            params: { template_slot_id },
        }
    );

    return response.data;
}
