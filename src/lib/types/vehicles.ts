export type VehicleType = {
    id: number;
    name: string;
    ru_name: string;
    description: string;
};

export type CreateVehiclePayload = {
    brand: string;
    model: string;
    vehicle_type_id: number;
    reg_number: string;
};
