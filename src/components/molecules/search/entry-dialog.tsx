import PrimaryBtn from '@/components/atoms/primary-btn';
import SelectField from '@/components/forms/select-field';
import { formatDateToDayMonthLabel } from '@/lib/utils/format-date';
import { ServiceResult } from '@/lib/utils/search-services';
import { MapPinIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

type EntryDialogProps = {
    carwash: ServiceResult | null;
    date: string;
    time: string;
};

type CarType = {
    label: string;
    id: number;
};

export default function EntryDialog({ carwash, date, time }: EntryDialogProps) {
    const [selectedCar, setSelectedCar] = useState<CarType>(dummyCars[0]);

    function handleChange(carId: number) {
        const newCar =
            dummyCars.find((car) => car.id === carId) ?? dummyCars[0];

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

            {dummyCars.length > 0 ? (
                <>
                    <p className='text-balance mb-4 text-center'>Для записи необходимо добавить авто в личном кабинете</p>
                    <PrimaryBtn route='/account' type="button" className="w-full">
                        Перейти в аккаунт
                    </PrimaryBtn>
                </>
            ) : (
                <>
                    <SelectField
                        values={dummyCars}
                        value={selectedCar}
                        onChange={handleChange}
                        className="w-full"
                    />

                    <PrimaryBtn type="button" className="w-full">
                        Записаться
                    </PrimaryBtn>
                </>
            )}
        </div>
    );
}

const dummyCars = [
    {
        label: 'Volvo',
        id: 1,
    },
    {
        label: 'Chevrole',
        id: 2,
    },
    {
        label: 'SUV',
        id: 3,
    },
];
