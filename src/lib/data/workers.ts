import { WorkerAssignmentsResponse } from '@/lib/types/workers';

export const mockWorkerAssignments: WorkerAssignmentsResponse = {
    data: [
        {
            assignment_id: 1,
            script_worker_id: 5,
            script_box_id: 7,
            script_box_name: 'Бокс №1',
        },
        {
            assignment_id: 2,
            script_worker_id: 5,
            script_box_id: 9,
            script_box_name: 'Бокс №2',
        },
        {
            assignment_id: 3,
            script_worker_id: 6,
            script_box_id: 10,
            script_box_name: 'Бокс №3',
        },
        {
            assignment_id: 4,
            script_worker_id: 6,
            script_box_id: 11,
            script_box_name: 'Бокс №4',
        },
        {
            assignment_id: 5,
            script_worker_id: 6,
            script_box_id: 12,
            script_box_name: 'Бокс №5',
        },
    ],
};
