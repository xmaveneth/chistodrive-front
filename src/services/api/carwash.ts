import { CarwashData, CarwashReviewsData } from "@/lib/types/carwash";
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

