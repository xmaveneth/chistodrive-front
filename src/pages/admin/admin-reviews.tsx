import ReviewCard from "@/components/molecules/admin/review-card";
import { useCarwashReviews } from "@/lib/hooks/reviews/use-carwash-reviews";
import { cn } from "@/lib/utils";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const reviewType = [
    "Новые",
    "Архив"
];
export default function AdminReviews() {
    const { id } = useParams();
    const { data: reviews, isLoading } = useCarwashReviews(Number(id));
    const [selected, setSelected] = useState(reviewType[0]);
    const mobileReviews = selected === "Новые" ? reviews?.reviews.new : reviews?.reviews.archive;

    if (isLoading) return <Skeleton />

    return (
        <>
            <div className="md:hidden space-y-4">
                <div className="text-left mb-2 relative w-max">
                    <div className="w-40 mb-4">
                        <Listbox value={selected} onChange={setSelected}>
                            <ListboxButton
                                className={cn(
                                    'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white',
                                    'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                )}
                            >
                                {selected}
                                <ChevronDownIcon
                                    className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                                    aria-hidden="true"
                                />
                            </ListboxButton>
                            <ListboxOptions
                                anchor="bottom"
                                transition
                                className={cn(
                                    'w-(--button-width) rounded-xl border border-white/5 bg-black p-1 [--anchor-gap:--spacing(1)] focus:outline-none',
                                    'transition duration-100 ease-in data-leave:data-closed:opacity-0'
                                )}
                            >
                                {reviewType.map((type) => (
                                    <ListboxOption
                                        key={type}
                                        value={type}
                                        className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                                    >
                                        <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                                        <div className="text-sm/6 text-white">{type}</div>
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Listbox>

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
