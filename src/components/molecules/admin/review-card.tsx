import { AdminReview } from "@/lib/types/reviews"
import Avatar from "@/assets/svgs/avatar.svg"
import { formatDateForReviews } from "@/lib/utils/format-date";
import Rating from "@mui/material/Rating";
import { ReviewImage } from "../account/show-review-dialog";
import useToggle from "@/lib/hooks/utils/use-toggle";
import DialogLayout from "@/components/layouts/dialog-layout";
import LeaveReviewReplyDialog from "./leave-review-reply-dialog";
import { Trash } from "lucide-react";
import DeleteReviewReplyDialog from "./delete-review-reply-dialog";

type ReviewCardProps = {
    review: AdminReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    const [showPopup, togglePopup] = useToggle(false);
    const [showDeleteReplyPopup, toggleDeleteReplyPopup] = useToggle(false);

    return <div className="mb-3">
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
                <div className="grid grid-cols-[repeat(4,_minmax(80px,_1fr))] gap-2 pt-3">
                    {review.media.map((file, index) => (
                        <ReviewImage key={index} img={file} />
                    ))}
                </div>
            )}

            {!review.is_review_reply_exist && <div className="px-4">
                <button onClick={() => togglePopup(true)} className="text-sm block mt-6 text-white ml-auto cursor-pointer transition-opacity hover:opacity-80">Ответить на отзыв</button>
            </div>}

        </div>
        {review.is_review_reply_exist && review.review_reply != null && (
            <div className="mt-4 ml-auto w-4/5 bg-white/10 rounded-xl pt-3.5 pb-7 px-5 space-y-2.5 relative">
                <p className="text-xs text-white">Ответ на отзыв</p>
                <div className="text-sm xs:text-base md:text-sm lg:text-base">{review.review_reply.comment}</div>
                <button onClick={() => toggleDeleteReplyPopup(true)} className="absolute right-3 cursor-pointer bottom-3 size-5">
                    <Trash className="size-full" />
                </button>
            </div>
        )}

        {!review.is_review_reply_exist && <DialogLayout
            isOpen={showPopup}
            closeDialog={() => {
                togglePopup(false);
            }}
            title="Ответ на отзыв"
            description="Оставьте отзыв, чтобы его видели все"
        >
            <LeaveReviewReplyDialog
                review={review}
                closeDialog={() => { togglePopup(false) }}
            />
        </DialogLayout>}

        {review.review_reply != null && <DialogLayout
            title="Вы уверены что хотите удалить данный ответ?"
            isOpen={showDeleteReplyPopup}
            closeDialog={() => toggleDeleteReplyPopup(false)}
        >
            <DeleteReviewReplyDialog
                reply={review.review_reply}
                closeDialog={() => toggleDeleteReplyPopup(false)}
            />
        </DialogLayout>}
    </div>
}
