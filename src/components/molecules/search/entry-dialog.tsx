import PrimaryBtn from '@/components/atoms/primary-btn';
import SelectField from '@/components/forms/select-field';
import { useCurrentUser } from '@/lib/hooks/auth/use-current-user';
import { useMakeAppointment } from '@/lib/hooks/carwashes/use-make-appoitment';
import { formatDateToDayMonthLabel } from '@/lib/utils/format-date';
import { ServiceResult, Slot } from '@/lib/utils/search-services';
import { MapPinIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

type EntryDialogProps = {
    carwash: ServiceResult | null;
    date: string;
    time: string;
    slot: Slot | null;
    closeDialog: () => void;
};

type CarType = {
    label: string;
    id: number;
};

export default function EntryDialog({ carwash, date, time, slot, closeDialog }: EntryDialogProps) {
    const { isError, data: user, isLoading } = useCurrentUser();

    const isLoggedIn = !(isError || !user);

    const {
        mutate: bookAppointment,
        isPending,
    } = useMakeAppointment(closeDialog);

    function handleSubmit() {
        if (selectedCar == null || slot == null) return;

        bookAppointment({ slot_id: slot.id, vehicle_id: selectedCar?.id });
    }

    const [selectedCar, setSelectedCar] = useState<CarType | null>(() => {
        if (
            user == null ||
            user.cars == null ||
            user.cars[0] == null ||
            user.cars.length === 0
        )
            return null;

        const firstUserCar = user.cars[0];
        return {
            id: firstUserCar.id,
            label: firstUserCar.brand,
        };
    });

    if (!isLoggedIn || user == null || user.cars == null || isLoading)
        return null;

    const userCars: CarType[] = user.cars.map((car) => {
        return {
            id: car.id,
            label: car.brand,
        };
    });

    function handleChange(carId: number) {
        const newCar = userCars.find((car) => car.id === carId) ?? userCars[0];

        setSelectedCar(newCar);
    }

    return (
        <div className="flex flex-col gap-2 items-center text-white">
            <p className="font-medium text-2xl">{carwash?.car_wash_name}</p>
            <p className="flex items-center gap-1 my-4 text-sm text-white/70">
                <MapPinIcon className="size-6 shrink-0 text-btn-bg" />
                {carwash?.address}
            </p>
            <p>{carwash?.service_name}</p>
            <p>
                {formatDateToDayMonthLabel(date)} {time}
            </p>
            <p className="mb-6">Цена {carwash?.price} ₽</p>

            {userCars.length === 0 ? (
                <>
                    <p className="text-balance mb-4 text-center">
                        Для записи необходимо добавить авто в личном кабинете
                    </p>
                    <PrimaryBtn
                        route="/account"
                        type="button"
                        className="w-full"
                    >
                        Перейти в аккаунт
                    </PrimaryBtn>
                </>
            ) : (
                <>
                    <SelectField
                        values={userCars}
                        value={selectedCar || userCars[0]}
                        onChange={handleChange}
                        className="w-full"
                    />

                    <PrimaryBtn disabled={isPending} onClick={handleSubmit} type="button" className="w-full">
                        Записаться
                    </PrimaryBtn>
                </>
            )}
        </div>
    );
}
