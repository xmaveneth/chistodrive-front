// a single time‐slot
export type ScriptVersionTimeSlot = {
    slot_id: number; // e.g. 1
    time: string; // e.g. "10:00"
};

// a worker with their available slots
export type ScriptVersionWorker = {
    worker_name: string; // e.g. "Иванов Иван Иванович"
    slots: ScriptVersionTimeSlot[];
};

// a service (e.g. “Мойка 111”) and its workers
export type ScriptVersionService = {
    service_name: string;
    workers: ScriptVersionWorker[];
};

// a service category (e.g. “Кузов”) grouping services
export type ScriptVersionServiceCategory = {
    service_category_name: string;
    service_list: ScriptVersionService[];
};

// all the data for one vehicle type ScriptVersion(e.g. “Легковой”)
export type ScriptVersionVehicleSlot = {
    vehicle_name: string;
    slots_data: ScriptVersionServiceCategory[];
};

// the root response
export type ScriptVersionSlotsResponse = {
    slots: ScriptVersionVehicleSlot[];
};
