import SearchField from '@/components/forms/search-field';
import SelectField from '@/components/forms/select-field';
import 'leaflet/dist/leaflet.css';

import SearchHeader from '@/components/molecules/search/search-header';
import { useState } from 'react';
import FilterField from '@/components/molecules/search/filter-field';
import DatePicker from '@/components/forms/date-picker';
import { useFilters } from '@/lib/hooks/useFilters';
import PrimaryBtn from '@/components/atoms/primary-btn';
import { getFilterOptions } from '@/lib/utils/get-filter-options';
import TimeRangePicker from '@/components/forms/time-range-picker';

export default function Search() {
    const { data, isLoading } = useFilters();



    const [cityId, setCityId] = useState<number | null>(null);
    const [query, setQuery] = useState('');
    const [orderById, setOrderById] = useState<number | null>(null);
    const [serviceCategoryId, setServiceCategoryId] = useState<number | null>(null);
    const [serviceTypeId, setServiceTypeId] = useState<number | null>(null);
    const [date, setDate] = useState<string | null>('01.01.2025');
    const [startTime, setStartTime] = useState('12:00');
    const [endTime, setEndTime] = useState('15:00');
    const [startPrice, setStartPrice] = useState(0);
    const [endPrice, setEndPrice] = useState(0);
    const [vehicleTypeId, setVehicleTypeId] = useState<number | null>(null);

    if (isLoading || !data) return <div>Загрузка фильтров...</div>;

    const {
        sortOptions,
        categoryOptions,
        serviceTypeOptions,
        carTypeOptions,
        currentSortOption,
        selectedCategoryOption,
        currentServiceTypeOption,
        currentCarTypeOption,
    } = getFilterOptions({
        filtersData: data.filters,
        currentFilters: {
            service_category_id: serviceCategoryId,
            order_by_id: orderById,
            vehicle_type_id: vehicleTypeId,
            service_type_id: serviceTypeId,
        },
    });

    return (
        <div className="primary-px primary-py">
            <SearchHeader />

            <section className="px-4 sm:px-8 sm:pb-9 xl:pb-8 xl:px-9 xl:pt-7 pt-5 pb-7 border border-border rounded-xl">
                <div className="mb-3.5 flex items-center gap-3 flex-wrap">
                    <SearchField
                        value={query}
                        onChange={(val) => setQuery(val)}
                        placeholder="Поиск по названию"
                        className="w-48 text-sm md:w-60"
                    />
                    <SelectField
                        values={sortOptions}
                        value={currentSortOption || null}
                        onChange={(val) => setOrderById(val)}
                        className="w-48 md:w-60"
                        placeholder="Сортировать по"
                    />
                </div>

                {/*  <div className="rounded-3xl overflow-clip z-0">
                    <AddressMap addresses={fakeAddresses} />
                </div>
 */}
                <div className="mt-3.5 mb-6 sm:mt-5 xl:mt-7 xl:mb-9.5">
                    <h2 className="mb-3.5 sm:mb-5 xl:mb-7 md:text-lg">
                        Фильтры
                    </h2>

                    <div className="flex items-center flex-wrap gap-x-3 sm:gap-x-4.5 gap-y-3 sm:gap-y-5">
                        <FilterField title="Дата">
                            <DatePicker
                                onChange={(val) => setDate(val)}
                                value={date}
                                className="w-60 md:w-80"
                            />
                        </FilterField>

                        <FilterField title="Временной интервал">
                            
                            <TimeRangePicker from='0:00' to="23:30" onChange={(range: { from: string; to: string }) => {
                                setStartTime(range.from);
                                setEndTime(range.to);
                            }} className="w-60" />
                        </FilterField>

                        <FilterField title="Категория услуги">
                            <SelectField
                                values={categoryOptions}
                                value={selectedCategoryOption}
                                onChange={(val) => setServiceCategoryId(val)}
                                className="w-60 md:w-80"
                            />
                        </FilterField>

                        {serviceCategoryId !== null && (
                            <FilterField title="Тип услуги">
                                <SelectField
                                    values={serviceTypeOptions}
                                    value={currentServiceTypeOption || null}
                                    onChange={(val) => setServiceTypeId(val)}
                                    className="w-60 md:w-80"
                                />
                            </FilterField>
                        )}

                        <FilterField title="Тип авто">
                            <SelectField
                                values={carTypeOptions}
                                value={currentCarTypeOption || null}
                                onChange={(val) => setVehicleTypeId(val)}
                                className="w-60 md:w-80"
                            />
                        </FilterField>

                        <PrimaryBtn className="py-2 mt-4.5">
                            Применить
                        </PrimaryBtn>
                    </div>
                </div>
            </section>
        </div>
    );
}
