import { axiosInstance } from "@/services/api/axios-instance";

export const fetchCarwashes = async (city: string) => {
    const { data } = await axiosInstance.get(
        `/api/car_wash/index_page_car_washes?city=${city}`
    );
    return data;
};
