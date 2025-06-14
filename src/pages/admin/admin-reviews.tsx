import ReviewCard from "@/components/molecules/admin/review-card";
import { useCarwashReviews } from "@/lib/hooks/reviews/use-carwash-reviews";
import { useParams } from "react-router-dom";

export default function AdminReviews() {
    const { id } = useParams();
    const { data: reviews, isLoading } = useCarwashReviews(Number(id));

    if (isLoading) return <div>Loading...</div>
    return (
        <div className="flex flex-wrap flex-col md:flex-row md:items-start items-center gap-6">
            <div className="flex-1 w-full grid gap-4">
                <div className="text-left mb-2 relative w-max">
                    Новые
                    <div className="absolute size-5 rounded-full bg-btn-bg -right-7 font-medium text-sm top-1 -translate-y-1/2 flex items-center justify-center p-1">{reviews?.reviews.new.length}</div>
                </div>
                {reviews?.reviews.new.map((review, idx) => (
                    <ReviewCard key={`new-review-card-${idx}`} review={review} isNew={true} />
                ))}
            </div>
            <div className="flex-1 w-full grid gap-4">
                <p className="text-left mb-2">Архив</p>
                {reviews?.reviews.archive.map((review, idx) => (
                    <ReviewCard key={`archive-review-card-${idx}`} review={review} />
                ))}
            </div>
        </div>);
}
