import { axiosInstance } from '@/services/api/axios-instance';

export const fetchCities = async () => {
    const { data } = await axiosInstance.get('/api/admin/cities');
    return data;
};
