import { range } from "@/lib/utils/range";

export default function IntervalSkeleton() {
    return (
        <div>
            <div className="flex items-center gap-3 mt-6">
                {range(1, 2).map((idx) => (
                    <div
                        key={`skeleton-btn-${idx}`}
                        className="py-2 px-4 md:text-lg text-transparent w-max bg-gray-200 animate-pulse rounded-full"
                    >
                        loadingloading
                    </div>
                ))}
            </div>

            {range(1, 3).map((skeleton) => (
                <div
                    key={`skeleton-item-${skeleton}`}
                    className="overflow-auto scrollbar-hidden"
                >
                    <div className="my-8 md:text-lg text-transparent w-max bg-gray-200 animate-pulse rounded-sm">
                        loading loading
                    </div>

                    <div className="my-6 md:text-lg text-transparent w-max bg-gray-200 animate-pulse rounded-sm">
                        loading loading
                    </div>

                    <TableHeadSkeleton />

                    {range(1, 3).map((index) => (
                        <TableRowSkeleton key={`table-row-skeleton-${index}`} />
                    ))}
                </div>
            ))}
        </div>
    );
}

function TableHeadSkeleton() {
    return (
        <div className="mb-4 bg-gray-200 text-transparent rounded-full h-12 sm:h-16 w-full animate-pulse">
            Loading
        </div>
    );
}

function TableRowSkeleton() {
    return (
        <div className="mx-auto mb-2 text-sm md:text-base py-2 bg-gray-200 text-transparent rounded-sm w-[calc(100%-32px)] animate-pulse">
            Loading
        </div>
    );
}
