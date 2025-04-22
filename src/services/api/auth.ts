import { User } from '@/lib/types/user';
import { axiosInstance } from '@/services/api/axios-instance';
import axios from 'axios';

type LoginCredentials = {
    telephone: string;
    password: string;
};

const plainAxiosInstance = axios.create({
    baseURL: 'https://api.chistodrive-wash.ru/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginUser = async ({ telephone, password }: LoginCredentials) => {
    const params = new URLSearchParams();
    params.append('telephone', telephone);
    params.append('password', password);

    const response = await plainAxiosInstance.post('api/jwt/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data;
};

type SignupCredentials = {
    name: string;
    telephone: string;
    password: string;
};

export const signupUser = async ({
    name,
    telephone,
    password,
}: SignupCredentials) => {
    const response = await axiosInstance.post('api/auth/registration', {
        name,
        telephone,
        password,
    });

    return response.data;
};

export type CurrentUserResponse = {
    name: string;
    telephone: string;
};

export const getCurrentUser = async (): Promise<User> => {
    const response = await axiosInstance.get('/api/profile/me');
    return response.data;
};

export const logoutCurrentUser = async (): Promise<void> => {
    await axiosInstance.post('/api/jwt/logout');
};

export const deleteCurrentUser = async (): Promise<void> => {
    await axiosInstance.post('/api/profile/delete_account');
};

export const isCurrentUserAdmin = async (): Promise<boolean> => {
    try {
        const response = await axiosInstance.get(
            '/api/profile/is_car_wash_admin'
        );
        return response.data.is_admin;
    } catch {
        return false;
    }
};
