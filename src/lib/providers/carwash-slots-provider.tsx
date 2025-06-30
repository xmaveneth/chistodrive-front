import { createContext, useEffect, useMemo, useState } from 'react';
import useDebounce from '@/lib/hooks/utils/use-debounce';
import { formatDateToString } from '@/lib/utils/format-date';
import { useGroupedVehicles } from '@/lib/hooks/vehicles/use-vehicles';
import { formatUserCars } from '@/lib/utils/format-user-cars';
import { CarwashServiceData } from '../types/carwash';
import { useSearchSlots } from '../hooks/carwash/use-search-slots';
import { useParams } from 'react-router-dom';
import { FiltersResponse } from '../types/filters';
import { useFilters } from '../hooks/carwashes/use-filters';

type CarwashSlotsContextType = {
    areFiltersLoading: boolean;
    filters: FiltersResponse | undefined;
    date: string;
    setDate: (val: string) => void;
    startTime: string;
    endTime: string;
    setStartTime: (val: string) => void;
    setEndTime: (val: string) => void;
    startPrice: number;
    endPrice: number;
    setStartPrice: (val: number) => void;
    setEndPrice: (val: number) => void;
    serviceCategoryId: number;
    setServiceCategoryId: (val: number) => void;
    serviceTypeId: number;
    setServiceTypeId: (val: number) => void;
    vehicleTypeId: number;
    setVehicleTypeId: (val: number) => void;
    servicesData: CarwashServiceData | undefined;
    areServicesLoading: boolean;
    isServicesError: boolean;
    userCars: {
        id: number;
        label: string;
    }[];
};

export const CarwashSlotsContext =
    createContext<CarwashSlotsContextType | null>(null);

export function CarwashSlotsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: filters, isLoading: areFiltersLoading } = useFilters();

    const [serviceCategoryId, setServiceCategoryId] = useState<number>(0);
    const [serviceTypeId, setServiceTypeId] = useState<number>(0);
    const [date, setDate] = useState<string>(formatDateToString(new Date()));
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('23:30');
    const [startPrice, setStartPrice] = useState(100);
    const [endPrice, setEndPrice] = useState(9900);
    const [vehicleTypeId, setVehicleTypeId] = useState<number>(1);
    const [servicesData, setServicesData] = useState<CarwashServiceData>({
        data: [],
    });

    const { id } = useParams();

    const {
        mutate: searchSlots,
        isPending: areServicesLoading,
        isError: isServicesError,
    } = useSearchSlots(Number(id));

    const handleSearchClick = () => {

        const currentFilters = {
            service_category_id: serviceCategoryId ?? 0,
            service_type_id: serviceTypeId ?? 0,
            date: date != '' ? date : formatDateToString(new Date()),
            start_time: startTime,
            end_time: endTime,
            start_price: startPrice,
            end_price: endPrice,
            vehicle_type_id: vehicleTypeId ?? 1,
        };

        searchSlots(currentFilters, {
            onSuccess: (data) => {
                setServicesData(data);
            },
        });
    };

    const { data: userVehicles } = useGroupedVehicles();

    const userCars = useMemo(() => {
        return formatUserCars(userVehicles, vehicleTypeId);
    }, [vehicleTypeId, userVehicles])

    useEffect(() => setServiceTypeId(0), [serviceCategoryId]);

    useEffect(() => handleSearchClick(), []);

    useDebounce(() => handleSearchClick(), 750, [
        serviceCategoryId,
        serviceTypeId,
        date,
        startTime,
        endTime,
        startPrice,
        endPrice,
        vehicleTypeId,
    ]);

    return (
        <CarwashSlotsContext.Provider
            value={{
                areFiltersLoading,
                filters,
                date,
                setDate,
                startTime,
                endTime,
                setStartTime,
                setEndTime,
                startPrice,
                endPrice,
                setStartPrice,
                setEndPrice,
                serviceCategoryId,
                setServiceCategoryId,
                serviceTypeId,
                setServiceTypeId,
                vehicleTypeId,
                setVehicleTypeId,
                servicesData,
                areServicesLoading,
                isServicesError,
                userCars: userCars,
            }}
        >
            {children}
        </CarwashSlotsContext.Provider>
    );
}
