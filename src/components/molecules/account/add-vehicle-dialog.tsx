import PrimaryBtn from '@/components/atoms/primary-btn';
import SelectField from '@/components/forms/select-field';
import TextField from '@/components/forms/text-field';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateVehicle } from '@/lib/hooks/vehicles/use-create-vehicle';
import { Field, Label } from '@headlessui/react';
import ErrorField from '@/components/forms/error-field';
import { useEffect } from 'react';
import { VehicleType } from '@/lib/types/vehicles';

const vehicleSchema = z.object({
    brand: z.string().min(1, 'Введите марку автомобиля'),
    model: z.string().min(1, 'Введите модель автомобиля'),
    vehicle_type_id: z.number({
        required_error: 'Выберите тип транспорта',
        invalid_type_error: 'Неверный формат ID типа транспорта',
    }),
    reg_number: z.string().min(1, 'Введите госномер'),
});

type VehicleFormInput = z.infer<typeof vehicleSchema>;

type AddVehicleDialogProps = {
    closeDialog: () => void;
    vehicleTypes: VehicleType[] | undefined;
};

export default function AddVehicleDialog({
    closeDialog,
    vehicleTypes,
}: AddVehicleDialogProps) {
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch,
        formState: { errors },
    } = useForm<VehicleFormInput>({
        resolver: zodResolver(vehicleSchema),
    });

    const { mutate: createVehicle, isPending } = useCreateVehicle(
        setError,
        closeDialog
    );
    /* const { data: vehicleTypes } = useVehicleTypes(); */

    const onSubmit = (data: VehicleFormInput) => {
        createVehicle(data);
    };

    const vehicleTypeOptions =
        vehicleTypes?.map((type) => ({
            label: type.ru_name,
            id: type.id,
        })) ?? [];

    const vehicleType = watch('vehicle_type_id');
    const currentVehicleType = vehicleTypeOptions.find(
        (option) => option.id === vehicleType
    );

    useEffect(() => {
        if (vehicleTypeOptions.length <= 0) return;

        setValue('vehicle_type_id', vehicleTypeOptions[0].id);
    }, [vehicleTypeOptions.length]);

    return (
        <form className="my-10 space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2 my-8">
                <TextField
                    registration={register('brand')}
                    type="text"
                    error={errors.brand?.message}
                    placeholder="Марка автомобиля"
                    label="Марка автомобиля"
                    shouldFocus
                />
                <TextField
                    registration={register('model')}
                    type="text"
                    error={errors.model?.message}
                    placeholder="Модель автомобиля"
                    label="Модель автомобиля"
                />
                {vehicleTypeOptions.length > 0 && currentVehicleType != null ? (
                    <Field>
                        <Label className="mb-1 flex items-center justify-between">
                            Тип автомобиля
                        </Label>
                        <SelectField
                            values={vehicleTypeOptions}
                            value={currentVehicleType}
                            onChange={(val) => setValue('vehicle_type_id', val)}
                            className="w-full"
                            hasBorder={true}
                        />
                        {errors.vehicle_type_id && (
                            <ErrorField>
                                {errors.vehicle_type_id.message}
                            </ErrorField>
                        )}
                    </Field>
                ) : (
                    <Skeleton />
                )}
                <TextField
                    registration={register('reg_number')}
                    type="text"
                    error={errors.reg_number?.message}
                    placeholder="Т111ТТ777"
                    label="Регистрационный номер"
                />
            </div>

            <PrimaryBtn type="submit" className="w-full" disabled={isPending}>
                Добавить автомобиль
            </PrimaryBtn>

            <PrimaryBtn
                type="button"
                onClick={closeDialog}
                className="w-full bg-input-bg hover:bg-zinc-800"
            >
                Вернуться назад
            </PrimaryBtn>
        </form>
    );
}

function Skeleton() {
    return (
        <div>
            <div className="mb-1 flex items-center justify-between">
                Тип автомобиля
            </div>
            <div className="bg-gray-400 text-transparent animate-pulse w-full rounded-full px-4 py-3">
                loading loading
            </div>
        </div>
    );
}
