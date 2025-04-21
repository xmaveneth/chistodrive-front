export type SortOption = {
    id: number;
    name: string;
};

export type ServiceType = {
    id: number;
    name: string;
    ru_name: string;
    description: string;
    service_category_id: number;
};

export type ServiceCategory =
    | {
          id: number;
          name: string;
          ru_name: string;
          description: string;
          types: ServiceType[];
      }
    | {
          id: number;
          ru_name: string;
      };

export type CarType = {
    id: number;
    name: string;
    ru_name: string;
    description: string;
};

export type Filters = {
    sortBy: SortOption[];
    category: ServiceCategory[];
    carType: CarType[];
};

export type FiltersResponse = {
    filters: Filters;
};

export function hasServiceTypes(
    category: ServiceCategory
): category is Extract<ServiceCategory, { types: ServiceType[] }> {
    return 'types' in category && Array.isArray(category.types);
}

export type SelectCarType = {
    label: string;
    id: number;
};