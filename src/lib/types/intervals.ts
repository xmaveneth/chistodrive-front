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
    workers: IntervalWorker[];
    boxes: IntervalBox[];
};

export type IntervalWorker = {
    interval_worker_id: number,
	script_worker_id: number,
	worker_name: string,
	prio_num: string
}

export type IntervalBox = {
	interval_box_id: number,
	script_box_id: number,
	box_name: string,
	prio_num: string
};

export type SelectValues = {
    workers: ScriptWorker[];
    boxes: ScriptBox[];
};

export type ScriptWorker = {
    script_worker_id: number;
    worker_name: string;
};


export type ScriptBox = {
    script_box_id: number;
    box_name: string;
};

export type UpdateScriptIntervalParams = {
    script_id: number;
    interval_id: number;
    price: number;
    workers: {
      script_worker_id: number;
      prio_num: number;
    }[];
    boxes: {
      script_box_id: number;
      prio_num: number;
    }[];
  };
  