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

export type FavouriteCarWash = {
    favourite_car_wash_id: number;
    car_wash_name: string;
    location: string;
};

export type FavouriteSlot = {
    favourite_slot_id: number;
    car_wash_name: string;
    location: string;
    date: string;  // format: 'YYYY-MM-DD'
    time: string;  // format: 'HH:mm'
};

export type Favourites = {
    slot: FavouriteSlot[];
    car_wash: FavouriteCarWash[];
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
