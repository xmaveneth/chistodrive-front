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
