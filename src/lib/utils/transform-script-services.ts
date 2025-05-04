import { CarWashServicesResponse } from '@/lib/types/service-params';

export function transformScriptServices(
    data: CarWashServicesResponse | undefined
) {
    if (data == null || data.data == null) return [];

    return data.data.map((service) => ({
        label: service.name,
        id: service.id,
    }));
}
