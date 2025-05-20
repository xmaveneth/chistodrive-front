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
}

export interface AppointmentResponse {
    data: CarwashAppointment[];
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
}

export interface FiltersResponse {
  filters: Filters;
}
