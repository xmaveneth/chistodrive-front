export type SearchFilters = {
    city_id: number;
    query: string;
    order_by_id: number;
    service_category_id: number;
    service_type_id: number;
    date: string;
    start_time: string;
    end_time: string;
    start_price: number;
    end_price: number;
    vehicle_type_id: number;
    page: number;
};

export type Slot = {
    id: number;
    time: string;
    price: number;
};

export type ServiceResult = {
    car_wash_id: number;
    car_wash_name: string;
    address: string;
    lat: string;
    lng: string;
    img: string;
    url: string;
    service_name: string;
    description: string;
    price: number;
    rating: number;
    start_price: number;
    end_price: number;
    slots: Slot[];
};

export type SearchServicesResponse = {
    data: ServiceResult[];
    page: number;
    total: number;
};

