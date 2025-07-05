import { useCarwashReviews } from "@/lib/hooks/carwash/use-carwash-reviews";
import Avatar from "@/assets/svgs/avatar.svg"
import { CarwashReview } from "@/lib/types/carwash";
import { conjugateReviewWord } from "@/lib/utils/conjugate-review-word";
import Rating from "@mui/material/Rating";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ReviewImage } from "@/components/molecules/account/show-review-dialog";
import { formatDateForReviews } from "@/lib/utils/format-date";
import PrimaryBtn from "@/components/atoms/primary-btn";
import { pluralizeReview } from "@/lib/utils/pluralizer";

export default function CarwashReviews() {
    const { id } = useParams();
    const [reviews, setReviews] = useState<CarwashReview[]>([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const rating = useRef(0);
    const totalReviews = useRef(0);

    const {
        mutate,
        isPending,
    } = useCarwashReviews(Number(id));

    const handleSearchClick = (page = 0) => {
        mutate(page, {
            onSuccess: (data) => {
                setReviews(prev =>
                    page === 0
                        ? data.data
                        : [...prev, ...data.data]
                );
                setPage(data.page);
                setTotal(data.total);
                rating.current = data.rating;
                totalReviews.current = data.total_reviews;
            },
        });
    };

    const incrementCurrentPage = () => {
        if (page >= total - 1) return;
        handleSearchClick(page + 1);
    };

    useEffect(() => {
        handleSearchClick(0);
    }, []);

    if (isPending) return <Skeleton />

    return (
        <div className="max-w-125 mx-auto lg:max-w-154 mt-5 md:mt-7 xl:mt-10">
            <div>
                <div className="flex mb-4 md:mb-8 items-center mx-auto w-max bg-white/10 px-5 py-4.5 gap-4 rounded-md">
                    <div className="text-white text-4xl font-bold">{rating.current}</div>
                    <div>
                        <Rating name="read-only" value={rating.current} readOnly />
                        <div className="text-gray-300 text-center -mt-1 text-xs">{totalReviews.current} {conjugateReviewWord(totalReviews.current)}</div>

                    </div>
                </div>

                <div className="text-white md:text-lg mb-3"> {pluralizeReview(totalReviews.current)}</div>
                <div className="space-y-4">
                    {reviews.map((review, idx) => (
                        <ReviewCard key={`archive-review-card-${idx}`} review={review} />
                    ))}
                </div>

               {reviews.length > 0 && <PrimaryBtn disabled={isPending} className="mx-auto mt-4 md:mt-8" onClick={incrementCurrentPage}>Показать еще</PrimaryBtn>} 
            </div>
        </div>
    )
}

type ReviewCardProps = {
    review: CarwashReview;
}

function ReviewCard({ review }: ReviewCardProps) {
    return (
        <>
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

            </div>
            {review.is_review_reply_exist && review.review_reply != null && (
                <div className="my-4 ml-auto w-4/5 bg-white/10 rounded-xl pt-3.5 pb-7 px-5 space-y-2.5 relative">
                    <p className="text-xs text-white">Ответ на отзыв</p>
                    <div className="text-sm xs:text-base md:text-sm lg:text-base">{review.review_reply.comment}</div>
                </div>
            )
            }
        </>
    )
}

function Skeleton() {
    return (
        <div className="max-w-125 mx-auto lg:max-w-154 mt-5 md:mt-7 xl:mt-10">
            <div className="mb-8 mx-auto w-70 rounded-xl h-20 bg-gray-100 animate-pulse">

            </div>
            <div className="w-full mb-4">
                <div className="rounded-xl w-full h-50 bg-gray-100 animate-pulse"></div>
            </div>
            <div className="w-full mb-4">
                <div className="rounded-xl w-full h-50 bg-gray-100 animate-pulse"></div>
            </div>
            <div className="w-full mb-4">
                <div className="rounded-xl w-full h-50 bg-gray-100 animate-pulse"></div>
            </div>
        </div>)
}

