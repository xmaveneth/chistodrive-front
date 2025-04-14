import { Filters } from '@/lib/types/filters';

type Params = {
    filtersData: Filters;
    currentFilters: {
        service_category_id: number | null;
        order_by_id: number | null;
        vehicle_type_id: number | null;
        service_type_id: number | null;
    };
};

export function getFilterOptions({ filtersData, currentFilters }: Params) {
    const sortOptions = filtersData.sortBy.map((opt) => ({
        label: opt.name,
        id: opt.id,
    }));

    const currentSortOption = sortOptions.find(
        (opt) => opt.id === currentFilters.order_by_id
    );

    const categoryOptions = filtersData.category.map((c) => ({
        label: c.ru_name,
        id: c.id,
    }));

    const selectedCategory = filtersData.category.find(
        (c) => c.id === currentFilters.service_category_id
    );

    const selectedCategoryOption = selectedCategory
        ? { id: selectedCategory.id, label: selectedCategory.ru_name }
        : null;

    const serviceTypeOptions =
        selectedCategory?.types.map((t) => ({
            label: t.ru_name,
            id: t.id,
        })) ?? [];

    const currentServiceTypeOption = serviceTypeOptions.find(
        (opt) => opt.id === currentFilters.service_type_id
    );

    const carTypeOptions = filtersData.carType.map((ct) => ({
        label: ct.ru_name,
        id: ct.id,
    }));

    const currentCarTypeOption = carTypeOptions.find(
        (opt) => opt.id === currentFilters.vehicle_type_id
    );

    return {
        sortOptions,
        categoryOptions,
        selectedCategoryOption,
        serviceTypeOptions,
        carTypeOptions,
        currentSortOption,
        currentServiceTypeOption,
        currentCarTypeOption
    };
}
