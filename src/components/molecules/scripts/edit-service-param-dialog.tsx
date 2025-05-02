import { useState } from 'react';
import PrimaryBtn from '@/components/atoms/primary-btn';
import TextField from '@/components/forms/text-field';
import { ScriptService } from '@/pages/script/script-services';
import { useUpdateScriptServiceParams } from '@/lib/hooks/scripts/use-update-script-service-params';
import { useParams } from 'react-router-dom';

type EditServiceParamDialogProps = {
    closeDialog: () => void;
    selectedScriptService: ScriptService | null;
};

type FormVehicle = {
    service_param_id: number;
    script_vehicle_type_id: number;
    vehicle_type_name: string;
    price: string;
    duration: string;
    errors?: {
        price?: string;
        duration?: string;
    };
};

export default function EditServiceParamDialog({
    closeDialog,
    selectedScriptService,
}: EditServiceParamDialogProps) {
    const [vehicles, setVehicles] = useState<FormVehicle[]>(
        selectedScriptService?.vehicles.map((v) => ({
            ...v,
            price: v.price != null ? String(v.price) : '',
            duration: v.duration != null ? String(v.duration) : '',
            errors: {},
        })) ?? []
    );
    const { id } = useParams();
    const { mutate, isPending } = useUpdateScriptServiceParams(Number(id));

    const validate = (v: FormVehicle) => {
        const errors: { price?: string; duration?: string } = {};

        const parsedPrice = v.price.trim() === '' ? null : Number(v.price);
        const parsedDuration =
            v.duration.trim() === '' ? null : Number(v.duration);

        if (parsedPrice !== null && (isNaN(parsedPrice) || parsedPrice < 0)) {
            errors.price = 'Цена должна быть числом больше или равным 0';
        }

        if (
            parsedDuration !== null &&
            (isNaN(parsedDuration) || parsedDuration < 0)
        ) {
            errors.duration = 'Время должно быть числом больше или равным 0';
        }

        return errors;
    };

    const handleChange = (
        index: number,
        field: keyof FormVehicle,
        value: string
    ) => {
        setVehicles((prev) =>
            prev.map((v, i) =>
                i === index
                    ? {
                          ...v,
                          [field]: value,
                          errors: { ...v.errors, [field]: undefined },
                      }
                    : v
            )
        );
    };

    const handleSubmit = () => {
        const updated = vehicles.map((v) => ({
            ...v,
            errors: validate(v),
        }));

        const hasErrors = updated.some(
            (v) => Object.keys(v.errors ?? {}).length > 0
        );

        setVehicles(updated);

        if (hasErrors) return;

        const serviceParamId = updated[0].service_param_id;

        const payload = updated.map((v) => ({
            service_param_id: v.service_param_id,
            script_vehicle_type_id: v.script_vehicle_type_id,
            price: v.price.trim() === '' ? null : Number(v.price),
            duration: v.duration.trim() === '' ? null : Number(v.duration),
        }));

        mutate({ script_service_id: serviceParamId, service_params: payload });
    };

    if (selectedScriptService == null) return null;

    return (
        <div className="my-6">
            <div className="w-full py-3 px-6 bg-input-bg rounded-full mb-4">
                {selectedScriptService.script_service.service_name}
            </div>

            <div className="mb-8 space-y-4">
                {vehicles.map((v, index) => (
                    <div key={v.service_param_id} className="mb-4 space-y-2">
                        <div className="text-white font-medium text-lg text-center">
                            {v.vehicle_type_name || 'Тип авто'}
                        </div>

                        <TextField
                            label="Цена в рублях"
                            registration={{
                                value: v.price,
                                onChange: (e) =>
                                    handleChange(
                                        index,
                                        'price',
                                        e.target.value
                                    ),
                            }}
                            error={v.errors?.price}
                        />

                        <TextField
                            label="Время в минутах"
                            registration={{
                                value: v.duration,
                                onChange: (e) =>
                                    handleChange(
                                        index,
                                        'duration',
                                        e.target.value
                                    ),
                            }}
                            error={v.errors?.duration}
                        />
                    </div>
                ))}
            </div>

            <PrimaryBtn
                disabled={isPending}
                onClick={handleSubmit}
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
