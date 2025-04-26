import { ScriptsResponse } from "@/lib/types/scripts";

export const dummyScripts: ScriptsResponse = {
    data: [
        {
            script_id: 1,
            script_name: 'Welcome Script',
            script_created_at: '2025-01-10T09:00:00.000Z',
            script_status: 'Готов',
            versions: [
                {
                    version_id: 1,
                    script_id: 1,
                    version_name: 'Welcome v1',
                    version_created_at: '2025-01-11T10:00:00.000Z',
                    version_status: 'Готов',
                },
                {
                    version_id: 2,
                    script_id: 1,
                    version_name: 'Welcome v2',
                    version_created_at: '2025-02-15T15:30:00.000Z',
                    version_status: 'На проверке',
                },
            ],
        },
        {
            script_id: 2,
            script_name: 'Closing Script',
            script_created_at: '2025-02-20T13:45:00.000Z',
            script_status: 'Черновик',
            versions: [
                {
                    version_id: 3,
                    script_id: 2,
                    version_name: 'Closing v1',
                    version_created_at: '2025-02-22T17:20:00.000Z',
                    version_status: 'Готов',
                },
            ],
        },
        {
            script_id: 3,
            script_name: 'Promotion Script',
            script_created_at: '2025-03-05T08:30:00.000Z',
            script_status: 'Готов',
            versions: [
                {
                    version_id: 4,
                    script_id: 3,
                    version_name: 'Promo v1',
                    version_created_at: '2025-03-06T09:00:00.000Z',
                    version_status: 'Готов',
                },
                {
                    version_id: 5,
                    script_id: 3,
                    version_name: 'Promo v2',
                    version_created_at: '2025-04-01T12:00:00.000Z',
                    version_status: 'На проверке',
                },
            ],
        },
    ],
};
