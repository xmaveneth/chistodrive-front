import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutCurrentUser } from '@/services/api/auth';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import notify from '@/lib/utils/notify';

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutCurrentUser,
        onSuccess: () => {
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            queryClient.invalidateQueries({ queryKey: ['current-user'] })
            navigate('/');
            notify("Вы вышли из личного кабинета");
        },
    });
};
