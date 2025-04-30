export type ScriptWorker = {
    script_worker_id: number;
    worker_id: number;
    full_name: string;
};

export type ScriptWorkersResponse = {
    data: ScriptWorker[];
};

export type Worker = {
    id: number;
    full_name: string;
};

export type WorkersResponse = {
    data: Worker[];
};
