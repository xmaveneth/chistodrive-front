import { ScriptsResponse } from '@/lib/types/scripts';

export function createScriptNameMap(scriptData: ScriptsResponse | undefined) {
    const obj: Record<string, string> = {};

    if (scriptData == null) return obj;

    scriptData.data.forEach((script) => {
        obj[script.script_id] = script.script_name;
    });

    return obj;
}

export function createScriptVersionNameMap(
    scriptData: ScriptsResponse | undefined
) {
    const obj: Record<string, string> = {};

    if (scriptData == null) return obj;

    scriptData.data.forEach((script) => {
        script.versions.forEach((version) => {
            obj[version.version_id] = version.version_name;
        });
    });

    return obj;
}
