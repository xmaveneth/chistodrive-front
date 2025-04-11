import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://api.chistodrive-wash.ru/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
