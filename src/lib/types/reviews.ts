export type AdminReview = {
    review_uuid: string;
    username: string;
    created_at: string;
    rating: number;
    comment: string;
    media: string[];
    is_review_reply_exist?: boolean;
    review_reply?: AdminReviewReply;
};

export type AdminReviewReply = {
    comment: string;
    created_at: string;
    uuid: string;
}

export type AdminReviewsResponse = {
    reviews: {
        new: AdminReview[];
        archive: AdminReview[];
    };
};
