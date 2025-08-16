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
    email: string;
    telephone: string;
    password: string;
};

type SignupResposeResponse = {
    uuid: string;
};

export const signupUser = async ({
    name,
    email,
    telephone,
    password,
}: SignupCredentials): Promise<SignupResposeResponse> => {
    const response = await axiosInstance.post('api/auth/v2.0/registration', {
        name,
        email,
        telephone,
        password,
    });

    return response.data;
};

export type ValidateSingupCodeType = {
    sms_code: string;
    email_code: string;
    user_uuid: string;
};

export const validateSignupCode = async ({
    sms_code,
    email_code,
    user_uuid,
}: ValidateSingupCodeType): Promise<{ access_token: string }> => {
    const response = await axiosInstance.post(
        'api/auth/v2.0/final_registration',
        {},
        {
            params: {
                sms_code,
                email_code,
                user_uuid,
            },
        }
    );
    return response.data;
};

export const resendEmailCode = async ({ user_uuid }: { user_uuid: string }) => {
    const response = await axiosInstance.post(
        'api/auth/v2.0/resend_email_code',
        {},
        {
            params: {
                user_uuid,
            },
        }
    );
    return response.data;
};

export const resendSmsCode = async ({ user_uuid }: { user_uuid: string }) => {
    const response = await axiosInstance.post(
        'api/auth/v2.0/resend_phone_code',
        {},
        {
            params: {
                user_uuid,
            },
        }
    );
    return response.data;
};

export const sendPasswordResetEmail = async ({ email }: { email: string }) => {
    const response = await axiosInstance.post(
        'api/auth/v2.0/send_restore_email',
        {},
        {
            params: {
                email,
            },
        }
    );
    return response.data;
};

export type ResetPasswordInput = {
    token: string;
    password: string;
    confirm_password: string;
};

export const resetPassword = async ({
    token,
    password,
    confirm_password,
}: ResetPasswordInput) => {
    const response = await axiosInstance.post(
        'api/auth/v2.0/restore_password',
        {
            token,
            password,
            confirm_password,
        }
    );
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
