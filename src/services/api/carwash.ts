import { CarwashData, CarwashReviewsData, CarwashServiceData } from "@/lib/types/carwash";
import { axiosInstance } from "./axios-instance";

export const getCarwashInfo = async (
    car_wash_id: number,
): Promise<CarwashData> => {
    const response = await axiosInstance.get(
        `/api/car_wash/${car_wash_id}/info`,
    );

    return response.data;
};


export const getCarwashReviews = async (
    car_wash_id: number,
    page: number,
): Promise<CarwashReviewsData> => {
    const response = await axiosInstance.get(
        `/api/car_wash/${car_wash_id}/review_list?page=${page}`,
    );

    return response.data;
};

export type SearchFilters = {
    service_category_id: number | null;
    service_type_id: number | null;
    date: string;
    start_time: string;
    end_time: string;
    start_price: number;
    end_price: number;
    vehicle_type_id: number;
};

export const fetchSlots = async (
    car_wash_id: number,
    filters: SearchFilters
): Promise<CarwashServiceData> => {
    const response = await axiosInstance.post<CarwashServiceData>(
        `/api/car_wash/${car_wash_id}/available_slots_list`,
        filters
    );
    return response.data;
};

