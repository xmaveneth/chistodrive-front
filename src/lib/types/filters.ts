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

export type ServiceCategory = {
    id: number;
    name: string;
    ru_name: string;
    description: string;
    types: ServiceType[];
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
