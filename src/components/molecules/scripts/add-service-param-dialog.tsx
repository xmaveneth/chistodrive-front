import PrimaryBtn from '@/components/atoms/primary-btn';
import SelectField from '@/components/forms/select-field';
import { STORAGE_KEYS } from '@/lib/constants/storageKeys';
import { useAddScriptService } from '@/lib/hooks/scripts/use-add-script-service';
import { useCarWashServices } from '@/lib/hooks/scripts/use-carwash-services';
import { ServiceCategory } from '@/lib/types/service-params';
import { transformScriptServices } from '@/lib/utils/transform-script-services';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type AddServiceParamDialogProps = {
    closeDialog: () => void;
    selectedServiceCategory: ServiceCategory | null;
};

export default function AddServiceParamDialog({
    closeDialog,
    selectedServiceCategory,
}: AddServiceParamDialogProps) {
    const currentCarwashId = localStorage.getItem(
        STORAGE_KEYS.ADMIN_CARWASH_ID
    );
    const { id } = useParams();
    const {
        data: carwashServices,
        isLoading: isLoadingCarwashServices,
        isError,
    } = useCarWashServices(
        Number(currentCarwashId),
        Number(id),
        selectedServiceCategory?.service_category_id
    );

    const scriptServices = transformScriptServices(carwashServices);

    const { mutate, isPending } = useAddScriptService(Number(id), closeDialog);

    const [selectedServiceId, setSelectedServiceId] = useState(
        scriptServices.length > 0 ? scriptServices[0].id : null
    );

    useEffect(() => {
        setSelectedServiceId(
            scriptServices.length > 0 ? scriptServices[0].id : null
        );
    }, [isLoadingCarwashServices]);

    function handleClick() {
        if (selectedServiceId == null) return;

        mutate(selectedServiceId);
    }

    const isLoading =
        isLoadingCarwashServices ||
        selectedServiceCategory == null ||
        carwashServices == null ||
        carwashServices.data == null;

    if (isError)
        return (
            <div className="my-6 text-center text-balance">
                Произошла ошибка загрузки услуг, попробуйте позже
            </div>
        );

    return (
        <div className="my-6">
            <div className="mb-8 space-y-4">
                {scriptServices.length === 0 ? (
                    <p>В данной категории отсутствуют услуги</p>
                ) : isLoading ? (
                    <Skeleton />
                ) : (
                    <SelectField
                        hasMargin={false}
                        onChange={(val) => setSelectedServiceId(val)}
                        value={
                            scriptServices.find(
                                (service) => service.id === selectedServiceId
                            ) || scriptServices[0]
                        }
                        values={scriptServices}
                    />
                )}
            </div>

            <PrimaryBtn
                disabled={isPending}
                onClick={handleClick}
                className="w-full mb-3"
            >
                Сохранить
            </PrimaryBtn>

            <PrimaryBtn
                type="button"
                onClick={closeDialog}
                className="w-full bg-input-bg hover:bg-zinc-800"
            >
                Вернуться назад
            </PrimaryBtn>
        </div>
    );
}

function Skeleton() {
    return (
        <div className="w-full py-3 px-6 bg-gray-200 rounded-full mb-4 animate-pulse text-transparent">
            loading loading
        </div>
    );
}
