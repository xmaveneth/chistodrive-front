import { axiosInstance } from '@/services/api/axios-instance';
import Cookies from 'js-cookie';

type RefreshResponse = {
    access_token: string;
    refresh_token: string;
    token_type: 'Bearer';
};

export const refreshToken = async (): Promise<RefreshResponse> => {
    const response = await axiosInstance.post<RefreshResponse>(
        '/api/jwt/refresh',
        null,
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('refresh_token')}`,
            },
        }
    );

    return response.data;
};
