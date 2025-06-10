export type Appointment = {
    appointment_id: number;
    date: string;
    time: string;
    price: number;
    car_wash_name: string;
    location: string;
    reg_num: string;
    service_name: string;
};

export type ArchivedAppointment = Appointment & {
    is_review_exist: boolean,
    review_uuid?: string,
    rating?: number,
    comment?: string,
    created_at?: string,
    media?: string[],
}
export type Car = {
    id: number;
    reg_number: string;
    owner_id: number;
    brand: string;
    model: string;
    vehicle_type_id: number;
};

export type VehicleTypeMap = Record<number, Car[]>;

export type FavouriteCarWash = {
    id: number;
    car_wash_id: number;
    car_wash_name: string;
    location: string;
};

export type FavouriteSlot = {
    id: number;
    slot_id: number;
    car_wash_name: string;
    location: string;
    date: string; // format: 'YYYY-MM-DD'
    time: string; // format: 'HH:mm'
    price: number;
    vehicle_type_id: number;
    service_name: string;
};

export type Favourites = {
    slot: FavouriteSlot[];
    car_wash: FavouriteCarWash[];
};

export type Appointments = {
    actual: Appointment[];
    archive: ArchivedAppointment[];
};

export type User = {
    name: string;
    telephone: string;
    appointments: Appointments;
    cars: Car[];
    favourites: Favourites;
};
