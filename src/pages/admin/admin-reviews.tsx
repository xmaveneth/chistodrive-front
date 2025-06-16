import SelectMenu from "@/components/atoms/select-menu";
import ReviewCard from "@/components/molecules/admin/review-card";
import { useCarwashReviews } from "@/lib/hooks/reviews/use-carwash-reviews";
import { useState } from "react";
import { useParams } from "react-router-dom";

const reviewTypes = [
    "Новые",
    "Архив"
];
export default function AdminReviews() {
    const { id } = useParams();
    const { data: reviews, isLoading } = useCarwashReviews(Number(id));
    const [selected, setSelected] = useState(reviewTypes[0]);

    if (isLoading) return <Skeleton />
    const mobileReviews = selected === "Новые" ? reviews?.reviews.new : reviews?.reviews.archive;

    return (
        <>
            <div className="md:hidden space-y-4">
                <div className="text-left mb-2 relative w-max">
                    <div className="w-40 mb-4">
                        <SelectMenu selected={selected} setSelected={setSelected} values={reviewTypes} />
                    </div>
                </div>
                {mobileReviews?.map((review, idx) => (
                    <ReviewCard key={`new-review-card-${idx}`} review={review} />
                ))}
            </div>
            <div className="hidden md:flex flex-wrap flex-col md:flex-row md:items-start items-center gap-6">
                <div className="md:flex-1 w-full space-y-4">
                    <div className="text-left mb-2 relative w-max">
                        Новые
                        {reviews && reviews.reviews.new.length > 0 && <div className="absolute size-5 rounded-full bg-btn-bg -right-7 font-medium text-sm top-1 -translate-y-1/2 flex items-center justify-center p-1">{reviews?.reviews.new.length}</div>}
                    </div>
                    {reviews?.reviews.new.map((review, idx) => (
                        <ReviewCard key={`new-review-card-${idx}`} review={review} />
                    ))}
                </div>
                <div className="md:flex-1 w-full space-y-4">
                    <p className="text-left mb-2">Архив</p>
                    {reviews?.reviews.archive.map((review, idx) => (
                        <ReviewCard key={`archive-review-card-${idx}`} review={review} />
                    ))}
                </div>
            </div>
        </>);
}

function Skeleton() {
    return (<div className="flex flex-wrap flex-col md:flex-row md:items-start items-center gap-6">
        <div className="flex-1 w-full grid gap-4">
            <div className="text-left mb-2 w-max">
                Новые
            </div>
            <div className="rounded-xl w-full h-50 bg-gray-100 animate-pulse"></div>
        </div>
        <div className="flex-1 w-full grid gap-4">
            <p className="text-left mb-2">Архив</p>
            <div className="rounded-xl w-full h-50 bg-gray-100 animate-pulse"></div>
        </div>
    </div>)
}
