import { deleteCurrentUser } from '@/services/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useDeleteUser = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCurrentUser,
        onSuccess: () => {
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            queryClient.invalidateQueries({ queryKey: ['current-user'] })
            navigate('/');
            toast("Пользователь успешно удален");
        },
    });
};
