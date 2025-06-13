import { AdminReview } from "@/lib/types/reviews"
import Avatar from "@/assets/svgs/avatar.svg"
import { formatDateForReviews } from "@/lib/utils/format-date";
import Rating from "@mui/material/Rating";
import { ReviewImage } from "../account/show-review-dialog";

type ReviewCardProps = {
    review: AdminReview;
    isNew?: boolean;
}

export default function ReviewCard({ isNew = false, review }: ReviewCardProps) {
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

            {isNew && <div className="px-4">
                <button className="text-sm block mt-6 text-white ml-auto cursor-pointer transition-opacity hover:opacity-80">Ответить на отзыв</button>
            </div>}

        </div>
        {isNew === false && (
            <div className="mt-4 ml-auto w-4/5 bg-white/10 rounded-xl pt-3.5 pb-7 px-5 space-y-2.5">
                <p className="text-xs text-white">Ответ на отзыв</p>
                <div className="text-sm xs:text-base md:text-sm lg:text-base">{review.review_reply?.comment}</div>
            </div>
        )}
    </div>
}
