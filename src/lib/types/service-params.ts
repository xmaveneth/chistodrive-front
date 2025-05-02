export type ServiceParam = {
    service_param_id: number;
    script_vehicle_type_id: number;
    vehicle_type_name: string;
    price: number;
    duration: number;
};

export type Service = {
    script_service_id: number;
    service_name: string;
    service_params: ServiceParam[];
};

export type ServiceCategory = {
    service_category_id: number;
    service_category_name: string;
    services: Service[];
};

export type ServiceCategoriesResponse = {
    data: ServiceCategory[];
};

export type ServiceParamUpdate = {
    service_param_id: number;
    script_vehicle_type_id: number;
    price: number | null;
    duration: number | null;
};

export type UpdateServiceParamsRequest = {
    script_service_id: number;
    service_params: ServiceParamUpdate[];
};
