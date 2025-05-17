import { range } from "lodash";

export default function AdminSkeleton() {
    return range(1, 5).map((number) => (
        <div
            key={`skeleton-${number}`}
            className="w-180 sm:w-282 text-center py-3 mx-4 bg-gray-400 text-transparent animate-pulse rounded-sm mb-1"
        >
            Loading
        </div>
    ));
}

