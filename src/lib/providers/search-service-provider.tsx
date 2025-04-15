import { useCityContext } from '@/lib/hooks/useCityContext';
import { useFilters } from '@/lib/hooks/useFilters';
import { useSearchServices } from '@/lib/hooks/useSearchServices';
import { FiltersResponse } from '@/lib/types/filters';
import { SearchServicesResponse } from '@/lib/utils/search-services';
import { createContext, useEffect, useState } from 'react';
import useDebounce from '@/lib/hooks/useDebounce';
import { formatDateToString } from '@/lib/utils/format-date';

type SearchServiceContextType = {
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
    query: string;
    setQuery: (val: string) => void;
    orderById: number;
    setOrderById: (val: number) => void;
    servicesData: SearchServicesResponse | undefined;
    areServicesLoading: boolean;
    isServicesError: boolean;
    handleSearchClick: () => void;
};

export const SearchServiceContext =
    createContext<SearchServiceContextType | null>(null);

export function SearchServiceProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: filters, isLoading: areFiltersLoading } = useFilters();

    const { currentCity } = useCityContext();
    const [query, setQuery] = useState('');
    const [orderById, setOrderById] = useState<number>(0);
    const [serviceCategoryId, setServiceCategoryId] = useState<number>(0);
    const [serviceTypeId, setServiceTypeId] = useState<number>(0);
    const [date, setDate] = useState<string>(formatDateToString(new Date()));
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('23:30');
    const [startPrice, setStartPrice] = useState(100);
    const [endPrice, setEndPrice] = useState(9900);
    const [vehicleTypeId, setVehicleTypeId] = useState<number>(1);

    const {
        mutate: searchServices,
        data: servicesData,
        isPending: areServicesLoading,
        isError: isServicesError,
    } = useSearchServices();

    const handleSearchClick = () => {
        if (!currentCity?.id) return;

        searchServices({
            city_id: currentCity.id,
            query: query.trim(),
            order_by_id: orderById ?? 0,
            service_category_id: serviceCategoryId ?? 0,
            service_type_id: serviceTypeId ?? 0,
            date: date ?? '',
            start_time: startTime,
            end_time: endTime,
            start_price: startPrice,
            end_price: endPrice,
            vehicle_type_id: vehicleTypeId ?? 1,
        });
    };

    useEffect(() => setServiceTypeId(0), [serviceCategoryId]);

    useEffect(() => handleSearchClick(), []);

    useDebounce(() => handleSearchClick(), 750, [
        currentCity.id,
        query,
        orderById,
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
        <SearchServiceContext.Provider
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
                query,
                setQuery,
                orderById,
                setOrderById,
                servicesData,
                areServicesLoading,
                isServicesError,
                handleSearchClick,
            }}
        >
            {children}
        </SearchServiceContext.Provider>
    );
}
