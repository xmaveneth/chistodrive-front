// Carwash Data

export type CarwashData = {
    data: {
        lat: string;
        lng: string;
        name: string;
        location: string;
        description: string;
        rating: number;
        review_num: number;
        media: string[];
    };
};

// Slots

export type CarwashSlot = {
    slot_id: number;
    time: string;
};

export type CarwashService = {
    service_id: number;
    service_name: string;
    start_price: string;
    end_price: string;
    slot_list: CarwashSlot[];
};

export type CarwashServiceCategory = {
    service_category_id: number;
    service_category_name: string;
    service_list: CarwashService[];
};

export type CarwashServiceData = {
    data: CarwashServiceCategory[];
};

// Reviews

export type CarwashReviewReply = {
    comment: string;
    created_at: string;
    uuid: string;
};

export type CarwashReview = {
    review_uuid: string;
    username: string;
    created_at: string;
    rating: number;
    comment: string;
    media: string[];
    is_review_reply_exist: boolean;
    review_reply?: CarwashReviewReply;
};

export type CarwashReviewsData = {
    rating: number;
    total_reviews: number;
    data: CarwashReview[];
    page: number;
    total: number;
};

