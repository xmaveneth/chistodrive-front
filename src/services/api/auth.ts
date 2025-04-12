import { axiosInstance } from '@/services/api/axios-instance';

type LoginCredentials = {
    telephone: string;
    password: string;
};

export const loginUser = async ({ telephone, password }: LoginCredentials) => {
    const params = new URLSearchParams();
    params.append('telephone', telephone);
    params.append('password', password);

    const response = await axiosInstance.post('api/jwt/login', params, {
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
