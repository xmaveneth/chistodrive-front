import { FiltersResponse } from '@/lib/types/filters';
import { axiosInstance } from './axios-instance';

export const fetchFilters = async (): Promise<FiltersResponse> => {
    const response = await axiosInstance.get('/api/search/filter_values');
    return response.data;
};
