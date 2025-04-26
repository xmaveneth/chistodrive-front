import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { createScript } from '@/services/api/scripts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useCreateScript(carWashId: number, closeDialog: () => void) {
    const queryClient = useQueryClient();

    return useMutation<string, Error, { name: string }>({
        mutationFn: ({ name }) => createScript(name, carWashId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SCRIPTS] });
            notify('Скрипт успешно добавлен!');
            closeDialog();
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail.msg === 'string'
                        ? detail.msg
                        : 'Ошибка добавления скрипта. Попробуйте позже.'
                );
            } else {
                notify('Ошибка добавления скрипта. Попробуйте позже.');
            }
        },
    });
}
