import { VehicleType } from '@/lib/types/vehicles';

export type SelectOption = {
    label: string;
    id: number;
};

export function getVehicleTypeOptions(data: VehicleType[]): SelectOption[] {
    return data.map((type) => ({
        label: type.ru_name,
        id: type.id,
    }));
}
