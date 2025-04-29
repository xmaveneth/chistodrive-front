import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import notify from '@/lib/utils/notify';
import { updateScriptVehicleTypes } from '@/services/api/vehicles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useUpdateScriptVehicleTypes(script_id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (vehicleTypeIds: number[]) =>
            updateScriptVehicleTypes(script_id, vehicleTypeIds),

        onSuccess: () => {
            notify('Типы авто успешно обновлены!');
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SCRIPT_VEHICLE_TYPES, script_id],
            });
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                notify(
                    typeof detail?.msg === 'string'
                        ? detail.msg
                        : 'Ошибка обновления типов авто. Попробуйте позже.'
                );
            } else {
                notify('Ошибка обновления типов авто. Попробуйте позже.');
            }
        },
    });
}
