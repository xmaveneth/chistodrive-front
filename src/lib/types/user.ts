export type Appointment = {
    appointment_id: number;
    date: string; // format: 'YYYY-MM-DD'
    time: string; // format: 'HH:mm:ss'
    price: number;
    car_wash_name: string;
    location: string;
    reg_num: string;
    service_name: string;
};

export type Car = {
    id: number;
    reg_number: string;
    owner_id: number;
    brand: string;
    model: string;
    vehicle_type_id: number;
};

export type Favourites = {
    slot: unknown[]; 
    car_wash: unknown[];
};

export type Appointments = {
    actual: Appointment[];
    archive: Appointment[];
};

export type User = {
    name: string;
    telephone: string;
    appointments: Appointments;
    cars: Car[];
    favourites: Favourites;
};
