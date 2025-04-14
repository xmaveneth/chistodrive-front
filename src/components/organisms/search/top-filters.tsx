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

    if (areFiltersLoading || !filters) return <div>Loading...</div>;

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
