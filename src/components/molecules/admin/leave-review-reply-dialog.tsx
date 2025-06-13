import PrimaryBtn from "@/components/atoms/primary-btn";
import Avatar from "@/assets/svgs/avatar.svg"
import { useLeaveReply } from "@/lib/hooks/reviews/use-leave-reply";
import { AdminReview } from "@/lib/types/reviews";
import { formatDateForReviews } from "@/lib/utils/format-date";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { ReviewImage } from "../account/show-review-dialog";
import { Textarea } from "@headlessui/react";

type LeaveReviewReplyDialogProps = {
    closeDialog: () => void;
    review: AdminReview;
};
export default function LeaveReviewReplyDialog({
    closeDialog,
    review
}: LeaveReviewReplyDialogProps) {
    const { mutate, isPending } = useLeaveReply(closeDialog);
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (review == null) return;

        mutate({ review_uuid: review.review_uuid, comment: comment })
    };

    if (review?.media == null || review.comment == null || review.rating == null) return null;

    return (
        <form className="my-10 space-y-2" onSubmit={(e) => { handleSubmit(e) }} encType='multipart/form-data'>

            <div className="space-y-2 my-8">
                <div className="bg-white/10 rounded-xl pt-3.5 pb-7 px-5 space-y-2.5">
                    <div className="flex items-center gap-4">
                        <div className="size-10">
                            <img src={Avatar} alt="Аватар пользователя" />
                        </div>
                        <div className="text-white text-sm">{review.username}</div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                        <Rating name="read-only" value={review.rating} size="small" readOnly />
                        <div>{formatDateForReviews(review.created_at)}</div>
                    </div>

                    <div className="text-sm xs:text-base md:text-sm lg:text-base">{review.comment}</div>

                    {review.media.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 pt-3">
                            {review.media.map((file, index) => (
                                <ReviewImage key={index} img={file} />
                            ))}
                        </div>
                    )}

                </div>

                <Textarea onChange={(e) => setComment(e.target.value)} value={comment} placeholder='Напишите комментарий' className="rounded-lg bg-white/10 w-full px-4 py-2 min-h-30" maxLength={480} />

            </div>

            <PrimaryBtn type="submit" disabled={isPending} className="w-full">
                Оставить ответ
            </PrimaryBtn>

            <PrimaryBtn
                type="button"
                onClick={closeDialog}
                className="w-full bg-input-bg hover:bg-zinc-800"
            >
                Вернуться назад
            </PrimaryBtn>
        </form>
    );
}
