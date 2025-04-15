import SearchField from "@/components/forms/search-field";
import SelectField from "@/components/forms/select-field";
import { useSearchServicesContext } from "@/lib/hooks/useSearchServicesContext";
import { getCurrentSortOption, getSortOptions } from "@/lib/utils/get-filter-options";

export default function TopFilters() {
    const {
        filters,
        query,
        setQuery,
        orderById,
        setOrderById,
        areFiltersLoading,
    } = useSearchServicesContext();

    if (areFiltersLoading || !filters) return <Skeleton />;

    const sortOptions = getSortOptions(filters.filters);
    const currentSortOption = getCurrentSortOption(filters.filters, orderById) ?? null;

    return (
        <div className="mb-3.5 flex items-center gap-3 flex-wrap">
            <SearchField
                value={query}
                onChange={(val) => setQuery(val)}
                placeholder="Поиск по названию"
                className="w-48 text-sm md:w-60"
            />
            <SelectField
                values={sortOptions}
                value={currentSortOption}
                onChange={(val) => setOrderById(val)}
                className="w-48 md:w-60"
                placeholder="Сортировать по"
            />
        </div>
    );
}

function Skeleton() {
    return (
        <div className="flex items-center flex-wrap gap-x-3 sm:gap-x-4.5 gap-y-3 sm:gap-y-5 text-transparent animate-pulse mb-3.5">
            {Array.from({ length: 2 }, (_, index) => (
                <div key={`skeleton-top-filters-${index}`} className="w-60 md:w-80 text-sm md:text-base bg-gray-200/50 input-field py-2 px-4 md:py-3 md:px-6 rounded-full gap-2 mb-3" aria-hidden={true}>loading</div>
            ))}
        </div>
    );
}
