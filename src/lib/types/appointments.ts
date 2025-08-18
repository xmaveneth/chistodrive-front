export type CarwashAppointment = {
    id: number;
    name: string;
    telephone: string;
    worker: string;
    box: string;
    auto: string;
    reg_num: string;
    service: string;
    price: number;
    date: string;
    time: string;
    status: string;
};

export interface AppointmentResponse {
    data: CarwashAppointment[];
    statuses: Status[];
}

export interface Status {
    id: number;
    name: string;
    code: string;
}

export interface Service {
    id: number;
    name: string;
    car_wash_id?: number;
    description?: string;
    service_type_id?: number;
}

export interface Filters {
    services: Service[];
    statuses: Status[];
}

export interface FiltersResponse {
    filters: Filters;
}

export type FiltersPayload = {
    date: string | null;
    start_time: string;
    end_time: string;
    start_price: number;
    end_price: number;
    service_id: number;
    status_id: number;
};
