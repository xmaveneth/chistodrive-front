import { useMutation } from '@tanstack/react-query';
import { logoutCurrentUser } from '@/services/api/auth';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logoutCurrentUser,
        onSuccess: () => {
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            navigate('/');
        },
    });
};
