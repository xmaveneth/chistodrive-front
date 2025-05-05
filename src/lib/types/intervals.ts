export type ScheduleIntervalsResponse = {
    intervals: VehicleInterval[];
    select_values: SelectValues;
};

export type VehicleInterval = {
    vehicle_type_name: string;
    interval_data: IntervalData[];
};

export type IntervalData = {
    service_category_name: string;
    services: ServiceWithIntervals[];
};

export type ServiceWithIntervals = {
    service_name: string;
    service_params_id: number;
    intervals: Interval[];
};

export type Interval = {
    interval_id: number;
    start_time: string;
    end_time: string;
    price: number;
    workers: number[];
    boxes: number[];
};

export type SelectValues = {
    workers: ScriptWorker[];
    boxes: ScriptBox[];
};

export type ScriptWorker = {
    script_worker_id: number;
    worker_name: string;
    prio_num: number;
};

export type ScriptBox = {
    script_box_id: number;
    box_name: string;
};
