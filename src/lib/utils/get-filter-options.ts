import { Address } from '@/lib/types/address';
import { Filters } from '@/lib/types/filters';
import { ServiceResult } from '@/lib/utils/search-services';

type SelectOption = {
    id: number;
    label: string;
};

export function findPassengerCarId(filtersData: Filters | undefined, name: string = 'passenger') {
    if (filtersData == null) return 0;

    return filtersData.carType.find((ct) => ct.name === name)?.id ?? 0;
}

export function getSortOptions(filtersData: Filters): SelectOption[] {
    return filtersData.sortBy.map((opt) => ({
        label: opt.name,
        id: opt.id,
    }));
}

export function getCurrentSortOption(
    filtersData: Filters,
    order_by_id: number | null
): SelectOption | undefined {
    return getSortOptions(filtersData).find((opt) => opt.id === order_by_id);
}

// --- Category Options ---
export function getCategoryOptions(filtersData: Filters): SelectOption[] {
    return filtersData.category.map((cat) => ({
        label: cat.ru_name,
        id: cat.id,
    }));
}

export function getSelectedCategoryOption(
    filtersData: Filters,
    service_category_id: number | null
): SelectOption | null {
    const category = filtersData.category.find(
        (c) => c.id === service_category_id
    );
    return category ? { id: category.id, label: category.ru_name } : null;
}

export function getSelectedCategory(
    filtersData: Filters,
    service_category_id: number | null
) {
    return (
        filtersData.category.find((c) => c.id === service_category_id) ?? null
    );
}

// --- Service Type Options ---
export function getServiceTypeOptions(
    filtersData: Filters,
    service_category_id: number | null
): SelectOption[] {
    const category = getSelectedCategory(filtersData, service_category_id);
    return (
        category?.types.map((t) => ({
            label: t.ru_name,
            id: t.id,
        })) ?? []
    );
}

export function getCurrentServiceTypeOption(
    filtersData: Filters,
    service_category_id: number | null,
    service_type_id: number | null
): SelectOption | null {
    return getServiceTypeOptions(filtersData, service_category_id).find(
        (opt) => opt.id === service_type_id
    ) ?? null;
}

// --- Car Type Options ---
export function getCarTypeOptions(filtersData: Filters): SelectOption[] {
    return filtersData.carType.map((ct) => ({
        label: ct.ru_name,
        id: ct.id,
    }));
}

export function getCurrentCarTypeOption(
    filtersData: Filters,
    vehicle_type_id: number
): SelectOption | null {
    return (
        getCarTypeOptions(filtersData).find(
            (opt) => opt.id === vehicle_type_id
        ) ?? null
    );
}

export function convertToAddresses(
    data: ServiceResult[] | undefined
): Address[] {
    return data
        ? data.map((item) => ({
              name: item.car_wash_name,
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lng),
          }))
        : [];
}
