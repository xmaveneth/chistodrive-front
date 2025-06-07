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
    review_uuid: number
): Promise<string> {
    const response = await axiosInstance.delete<string>(
        `/api/review/delete?review_uuid=${review_uuid}`
    );

    return response.data;
}

