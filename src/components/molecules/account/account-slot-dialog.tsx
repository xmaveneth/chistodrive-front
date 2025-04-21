import AppoitmentEntryBtn from '@/components/atoms/appoitment-entry-btn';
import SecondaryBtn from '@/components/atoms/secondary-btn';
import { useDeleteFavouriteSlot } from '@/lib/hooks/carwashes/use-delete-favourite-slot';
import { useMakeAppointment } from '@/lib/hooks/carwashes/use-make-appoitment';
import { useGroupedVehicles } from '@/lib/hooks/vehicles/use-vehicles';
import { SelectCarType } from '@/lib/types/filters';
import { FavouriteSlot } from '@/lib/types/user';
import { formatDateToDayMonthLabel } from '@/lib/utils/format-date';
import { formatUserCars } from '@/lib/utils/format-user-cars';
import { MapPinIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

type AccountSlotDialogProps = {
    slot: FavouriteSlot | null;
    closeDialog: () => void;
};

export default function AccountSlotDialog({
    slot,
    closeDialog,
}: AccountSlotDialogProps) {
    const { data: userVehicles, isPending: loadingGroupedVehicles } =
        useGroupedVehicles();

    const { mutate: bookAppointment, isPending } =
        useMakeAppointment(closeDialog);

    const { mutate: deleteFavouriteSlot } =
        useDeleteFavouriteSlot(
            () => {},
            false,
            () => {}
        );

    const userCars =
        slot == null ? [] : formatUserCars(userVehicles, slot.vehicle_type_id);

    const [selectedCar, setSelectedCar] = useState<SelectCarType | null>(() => {
        if (userCars.length === 0) return null;

        return userCars[0];
    });

    function handleSubmit() {
        if (selectedCar == null || slot == null) return;

        bookAppointment({ slot_id: slot.id, vehicle_id: selectedCar.id });
        deleteFavouriteSlot(slot.id);
    }

    function handleChange(carId: number) {
        const newCar = userCars.find((car) => car.id === carId) ?? userCars[0];

        setSelectedCar(newCar);
    }

    if (slot == null) return null;

    return (
        <div className="flex flex-col gap-2 items-center text-white">
            <p className="font-medium text-2xl">{slot.car_wash_name}</p>
            <p className="flex items-center gap-1 my-4 text-sm text-white/70">
                <MapPinIcon className="size-6 shrink-0 text-btn-bg" />
                {slot.location}
            </p>
            <p>{slot.service_name}</p>
            <p>
                {formatDateToDayMonthLabel(slot.date)} {slot.time}
            </p>
            <p className="mb-6">Цена {slot.price} ₽</p>

            {!loadingGroupedVehicles && (
                <AppoitmentEntryBtn
                    showShow={userCars.length === 0}
                    userCars={userCars}
                    selectedCar={selectedCar}
                    disabled={isPending}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            )}

            <SecondaryBtn
                onClick={closeDialog}
                type="button"
                className="w-full mt-2"
            >
                Вернуться назад
            </SecondaryBtn>
        </div>
    );
}
