import { SelectCarType } from '@/lib/types/filters';
import { VehicleTypeMap } from '@/lib/types/user';

export function formatUserCars(
    userVehicles: VehicleTypeMap | undefined,
    vehicleTypeId: number
): SelectCarType[] {
    if (userVehicles == null || !(vehicleTypeId in userVehicles)) return [];

    return (
        userVehicles[vehicleTypeId].map((car) => ({
            id: car.id,
            label: car.brand,
        })) ?? []
    );
}
