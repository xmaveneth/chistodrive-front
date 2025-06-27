import { ServiceResponse } from "@/lib/types/services";
import { axiosInstance } from "./axios-instance";

export async function getCarwashServices(
    car_wash_id: number
): Promise<ServiceResponse> {
    const response = await axiosInstance.get<ServiceResponse>(
        `/api/car_wash/${car_wash_id}/services`
    );
    return response.data;
}

export async function createCarwashService(
    car_wash_id: number,
    name: string,
    description: string,
    service_type_id: number,
): Promise<string> {
    const response = await axiosInstance.post<string>(
        `/api/car_wash/${car_wash_id}/services`,
        { 
            name: name,
            description: description,
            service_type_id: service_type_id
        }
    );

    return response.data;
}

export async function deleteCarwashService(
    car_wash_id: number,
    service_id: number,
): Promise<string> {
    const response = await axiosInstance.delete<string>(
        `/api/car_wash/${car_wash_id}/services/?service_id=${service_id}`,
    );

    return response.data;
}

