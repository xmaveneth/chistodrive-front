export type ScheduleSlot = {
    slot_id: number;
    time: string; // format: "HH:mm:ss"
};

export type ScheduleWorker = {
    worker_name: string;
    slots: ScheduleSlot[];
};

export type ScheduleService = {
    service_name: string;
    workers: ScheduleWorker[];
};

export type ScheduleServiceCategoryData = {
    service_category_name: string;
    service_list: ScheduleService[];
};

export type ScheduleVehicleTypeSlots = {
    vehicle_type_name: string;
    slots_data: ScheduleServiceCategoryData[];
};

export type ScheduleVersion = {
    id: number;
    updated_at: string; 
    created_at: string;
    script_id: number;
    name: string;
};

export type ScheduleData = {
    is_applied: boolean;
    versions: ScheduleVersion[];
    slots: ScheduleVehicleTypeSlots[];
};
