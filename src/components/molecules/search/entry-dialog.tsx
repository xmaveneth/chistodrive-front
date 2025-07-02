import AddFavouriteBtn from '@/components/atoms/add-favourite-btn';
import { useCurrentUser } from '@/lib/hooks/auth/use-current-user';
import { useMakeAppointment } from '@/lib/hooks/carwashes/use-make-appoitment';
import { useAddFavouriteSlot } from '@/lib/hooks/carwashes/use-add-favourite-slot';
import { formatDateToDayMonthLabel } from '@/lib/utils/format-date';
import { ServiceResult, Slot } from '@/lib/utils/search-services';
import { MapPinIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { useDeleteFavouriteSlot } from '@/lib/hooks/carwashes/use-delete-favourite-slot';
import { useSearchServicesContext } from '@/lib/hooks/context/use-search-services-context';
import { SelectCarType } from '@/lib/types/filters';
import AppoitmentEntryBtn from '@/components/atoms/appoitment-entry-btn';

type EntryDialogProps = {
    carwash: ServiceResult | null;
    date: string;
    time: string;
    slot: Slot | null;
    closeDialog: () => void;
    userCars: {
        id: number;
        label: string;
    }[];
};

export default function EntryDialog({
    carwash,
    date,
    time,
    slot,
    closeDialog,
    userCars
}: EntryDialogProps) {
    const { isError, data: user, isLoading } = useCurrentUser();

    const isLoggedIn = !(isError || !user);

    const { mutate: bookAppointment, isPending } =
        useMakeAppointment(closeDialog);

    const [isFavourite, setIsFavourite] = useState(() => isThisSlotFavourite());
    const [optimisticAdded, setOptimisticAdded] = useState(isFavourite);

    const { mutate: addFavouriteSlot, isPending: isFavoritePending } =
        useAddFavouriteSlot(
            () => setIsFavourite(true),
            () => setIsFavourite(isFavourite)
        );
    const { mutate: deleteFavouriteSlot, isPending: isDeleteFavoritePending } =
        useDeleteFavouriteSlot(
            () => setIsFavourite(false),
            false,
            () => setIsFavourite(isFavourite)
        );

    function handleAddFavourite() {
        if (slot == null) return;

        setOptimisticAdded(true);
        addFavouriteSlot(slot.id);
    }

    function handleDeleteFavourite() {
        if (user == null || slot == null) return;

        const favouriteSlot = user.favourites.slot.find(
            (fav_slot) => fav_slot.slot_id === slot.id
        );

        if (favouriteSlot == null) return;

        setOptimisticAdded(false);
        deleteFavouriteSlot(favouriteSlot.id);
    }

    function handleSubmit() {
        if (selectedCar == null || slot == null) return;

        bookAppointment({ slot_id: slot.id, vehicle_id: selectedCar?.id });
    }

    const [selectedCar, setSelectedCar] = useState<SelectCarType | null>(() => {
        if (user == null || userCars.length === 0) return null;

        return userCars[0];
    });

    if (!isLoggedIn || user == null || user.cars == null || isLoading)
        return null;

    function isThisSlotFavourite() {
        if (slot == null || user == null) return false;

        return (
            user.favourites.slot.find(
                (fav_slot) => fav_slot.slot_id === slot.id
            ) != null
        );
    }


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
            <p className='text-balance text-center mb-2'>{carwash?.service_name}</p>
            <p>
                {formatDateToDayMonthLabel(date)} {time}
            </p>
            <p className="mb-6">Цена {slot?.price} ₽</p>

            <AppoitmentEntryBtn
                showShow={userCars.length === 0}
                userCars={userCars}
                selectedCar={selectedCar}
                disabled={isPending}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />

            <AddFavouriteBtn
                addClick={handleAddFavourite}
                deleteClick={handleDeleteFavourite}
                disabled={isFavoritePending || isDeleteFavoritePending}
                sizeClass="size-4"
                className="absolute top-3 left-6"
                isAdded={optimisticAdded}
            />
        </div>
    );
}
