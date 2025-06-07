
export default function createReviewPayload({
    appointment_id,
    rating,
    comment,
    files,
}: {
    appointment_id: number;
    rating: number;
    comment: string;
    files?: File[];
}) {
    const formData = new FormData();
    formData.append('appointment_id', String(appointment_id));
    formData.append('rating', String(rating));
    formData.append('comment', comment);
    if (files) {
        files.forEach((file) => {
            formData.append('files', file);
        });
    }
    return formData;
}
