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
    job_title: string;
    telephone: string | null;
};

export type WorkersResponse = {
    data: Worker[];
};

export type WorkerAssignment = {
    assignment_id: number;
    script_worker_id: number;
    script_box_id: number;
    script_box_name: string;
};

export type WorkerAssignmentsResponse = {
    data: WorkerAssignment[];
};
