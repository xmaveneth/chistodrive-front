
import DatePicker from '@/components/forms/date-picker';
import PriceRangePicker from '@/components/forms/price-range-picker';
import SelectField from '@/components/forms/select-field';
import TimeRangePicker from '@/components/forms/time-range-picker';
import FilterField from '@/components/molecules/search/filter-field';
import { useSearchServicesContext } from '@/lib/hooks/useSearchServicesContext';

import {
    getCarTypeOptions,
    getCategoryOptions,
    getCurrentCarTypeOption,
    getCurrentServiceTypeOption,
    getServiceTypeOptions,
} from '@/lib/utils/get-filter-options';

export default function PrimaryFilters() {
    const {
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
    } = useSearchServicesContext();


    if (areFiltersLoading || !filters) return <Skeleton />;

    const categoryOptions = getCategoryOptions(filters.filters);
    const serviceTypeOptions = getServiceTypeOptions(
        filters.filters,
        serviceCategoryId
    );
    const carTypeOptions = getCarTypeOptions(filters.filters);
    const currentServiceTypeOption = getCurrentServiceTypeOption(
        filters.filters,
        serviceCategoryId,
        serviceTypeId
    );
    const currentCarTypeOption = getCurrentCarTypeOption(
        filters.filters,
        vehicleTypeId
    );

    return (
        <div className="flex items-center flex-wrap gap-x-3 sm:gap-x-4.5 gap-y-3 sm:gap-y-5">
            <FilterField title="Дата">
                <DatePicker
                    onChange={(val) => setDate(val)}
                    value={date}
                    className="w-60 md:w-80"
                />
            </FilterField>

            <FilterField title="Временной интервал">
                <TimeRangePicker
                    from={startTime}
                    to={endTime}
                    onChange={(range) => {
                        setStartTime(range.from);
                        setEndTime(range.to);
                    }}
                    className="w-60"
                />
            </FilterField>

            <FilterField title="Цена, ₽">
                <PriceRangePicker
                    from={startPrice}
                    to={endPrice}
                    onChange={(range) => {
                        setStartPrice(range.from);
                        setEndPrice(range.to);
                    }}
                    className="w-60"
                />
            </FilterField>

            <FilterField title="Категория услуги">
                <SelectField
                    values={categoryOptions}
                    value={
                        categoryOptions.find(
                            (opt) => opt.id === serviceCategoryId
                        ) || null
                    }
                    onChange={(val) => setServiceCategoryId(val)}
                    className="w-60 md:w-80"
                />
            </FilterField>

            {serviceCategoryId !== null && (
                <FilterField title="Тип услуги">
                    <SelectField
                        values={serviceTypeOptions}
                        value={currentServiceTypeOption}
                        onChange={(val) => setServiceTypeId(val)}
                        className="w-60 md:w-80"
                    />
                </FilterField>
            )}

            <FilterField title="Тип авто">
                <SelectField
                    values={carTypeOptions}
                    value={currentCarTypeOption}
                    onChange={(val) => setVehicleTypeId(val)}
                    className="w-60 md:w-80"
                />
            </FilterField>

            {/*  <PrimaryBtn onClick={handleSearchClick} className="py-2 mb-4.5">
                Применить
            </PrimaryBtn> */}
        </div>
    );
}

function Skeleton() {
    return (
        <div className="flex items-center flex-wrap gap-x-3 sm:gap-x-4.5 gap-y-3 sm:gap-y-5 text-transparent animate-pulse">
            {Array.from({ length: 6 }, () => (
                <div>
                    <div className="text-sm mb-2.5 md:text-base w-1/2 rounded-full bg-gray-200/50">loading</div>
                    <div className="w-60 md:w-80 text-sm md:text-base bg-gray-200/50 input-field py-2 px-4 md:py-3 md:px-6 rounded-full gap-2 mb-3" aria-hidden={true}>loading</div>
                </div>
            ))}
        </div>
    );
}
