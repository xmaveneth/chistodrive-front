import { AdminReviewsResponse } from "@/lib/types/reviews";
import { axiosInstance } from "./axios-instance";

export async function postReview(data: FormData) {
    const res = await axiosInstance.post('/api/review/create', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
}

export async function deleteReview(
    review_uuid: string
): Promise<string> {
    const response = await axiosInstance.delete<string>(
        `/api/review/delete?review_uuid=${review_uuid}`
    );

    return response.data;
}

export async function getReviews(
    car_wash_id: number
): Promise<AdminReviewsResponse> {
    const response = await axiosInstance.get<AdminReviewsResponse>(
        `/api/car_wash/${car_wash_id}/reviews`
    );

    return response.data;
}

export async function createReviewReply(
    review_uuid: string,
    comment: string,
): Promise<string> {
    const response = await axiosInstance.post<string>('/api/review/create_reply', {
        review_uuid,
        comment,
    });

    return response.data;
}

export async function deleteReviewReply(
    review_uuid: string
): Promise<string> {
    const response = await axiosInstance.delete<string>(
        `/api/review/delete-reply?review_uuid=${review_uuid}`
    );

    return response.data;
}
