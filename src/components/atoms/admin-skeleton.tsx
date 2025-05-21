import clsx from "clsx";
import { range } from "lodash";

type AdminSkeletonType = {
    className?: string;
}

export default function AdminSkeleton({className}: AdminSkeletonType) {
    return range(1, 5).map((number) => (
        <div
            key={`skeleton-${number}`}
            className={clsx("w-180 sm:w-282 text-center py-3 mx-4 bg-gray-400 text-transparent animate-pulse rounded-sm mb-1", className)}
        >
            Loading
        </div>
    ));
}

