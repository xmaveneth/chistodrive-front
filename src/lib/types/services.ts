
export interface ServiceData {
    data: ServiceCategoryWithServices[];
    service_categories: ServiceCategory[];
}

export interface ServiceCategory {
    service_category_id: number;
    service_category_ru_name: string;
}

export interface ServiceCategoryWithServices extends ServiceCategory {
    service_list: Service[];
}

export interface Service {
    service_id: number;
    service_type: string;
    service_name: string;
    description: string;
    created_at: string;
}
