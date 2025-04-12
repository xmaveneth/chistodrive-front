import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://api.chistodrive-wash.ru/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


/* import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
    baseURL: 'https://api.chistodrive-wash.ru/',
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
 */