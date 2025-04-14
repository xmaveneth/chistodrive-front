import { SearchServicesResponse } from '@/lib/utils/search-services';
import { axiosInstance } from './axios-instance';

export type SearchFilters = {
    city_id: number;
    query: string;
    order_by_id: number | null;
    service_category_id: number | null;
    service_type_id: number | null;
    date: string;
    start_time: string;
    end_time: string;
    start_price: number;
    end_price: number;
    vehicle_type_id: number;
};

export const fetchServices = async (filters: SearchFilters): Promise<SearchServicesResponse> => {
    const response = await axiosInstance.post<SearchServicesResponse>('/api/search/services', filters);
    return response.data;
  };