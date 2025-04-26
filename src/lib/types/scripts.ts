export type ScriptVersion = {
    version_id: number;
    script_id: number;
    version_name: string;
    version_created_at: string;
    version_status: string;
};

export type Script = {
    script_id: number;
    script_name: string;
    script_created_at: string;
    script_status: string;
    versions: ScriptVersion[];
};

export type ScriptsResponse = {
    data: Script[];
};
