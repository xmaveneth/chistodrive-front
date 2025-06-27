export type Service = {
    service_id: number;
    service_type: string;
    service_name: string;
    description: string;
    created_at: string;
};

export type ServiceCategoryList = {
    service_category_id: number;
    service_category_ru_name: string;
    service_list: Service[];
};

export type ServiceType = {
    service_type_id: number;
    service_type_ru_name: string;
};

export type ServiceCategories = {
    service_category_id: number;
    service_category_ru_name: string;
    service_types_list: ServiceType[];
};

export type ServiceResponse = {
    data: ServiceCategoryList[];
    service_categories: ServiceCategories[];
};

