export type WorkDay = {
    start: string | null;
    end: string | null;
    is_day_off: boolean;
};

export type CarWash = {
    id: number;
    name: string;
    location: string;
    telephone: string;
    schedule: WorkDay[];
};

export type CarWashListResponse = {
    data: CarWash[];
};

export type UpdateSchedulePayload = {
    car_wash_id: number;
    data: WorkDay[];
};


export type AdminCarWashResponse = {
    data: CarWash;
};
