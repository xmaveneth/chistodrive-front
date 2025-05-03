import { BoxListType, ScriptBox } from '@/lib/types/boxes';
import {
    ScriptWorkersResponse,
    WorkerAssignmentsResponse,
    WorkersResponse,
} from '@/lib/types/workers';

export function createAllWOrkersArray(rawWorkers: WorkersResponse | undefined) {
    if (rawWorkers == null || rawWorkers.data == null) return [];

    return rawWorkers.data.map((worker) => worker.full_name);
}

export function createSelectedWorkersArray(
    rawWorkers: ScriptWorkersResponse | undefined
) {
    if (rawWorkers == null || rawWorkers.data == null) return [];

    return rawWorkers.data.map((worker) => worker.full_name);
}

export function generateSelectedWorkerIds(
    rawWorkers: WorkersResponse | undefined,
    selectedWorkerNames: string[]
) {
    const result: number[] = [];
    if (rawWorkers == null || rawWorkers.data == null) return result;

    selectedWorkerNames.forEach((workerName) => {
        const detectedWorker = rawWorkers.data.find(
            (rawWorker) => rawWorker.full_name === workerName
        );

        if (detectedWorker != null) {
            result.push(detectedWorker.id);
        }
    });

    return result;
}

export function createSelectFieldBoxes(
    allBoxes: ScriptBox[],
    boxList: BoxListType
) {
    return allBoxes
        .filter((box) =>
            boxList.every((boxListItem) => boxListItem.boxName !== box.name)
        )
        .map((box) => {
            return {
                label: box.name,
                id: box.script_box_id,
            };
        });
}

export function createScriptWorkerBoxList(
    data: WorkerAssignmentsResponse | undefined,
    workerId: number | undefined
) {
    if (data == null || data.data == null || workerId == null) return [];

    return data.data
        .filter((assigment) => assigment.script_worker_id === workerId)
        .map((workerAssigment) => {
            return {
                boxName: workerAssigment.script_box_name,
                assignmentId: workerAssigment.assignment_id,
            };
        });
}
