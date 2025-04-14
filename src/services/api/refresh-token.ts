import Cookies from 'js-cookie';
import axios from 'axios';

export const plainAxios = axios.create({
    baseURL: 'https://api.chistodrive-wash.ru/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

type RefreshResponse = {
    access_token: string;
    refresh_token: string;
    token_type: 'Bearer';
};

export const refreshToken = async (): Promise<RefreshResponse> => {
    const response = await plainAxios.post<RefreshResponse>(
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
