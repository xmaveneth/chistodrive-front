export default function AdminItemSkeleton() {
    return (
        <div className="w-full px-6 py-3 pl-6 bg-gray-400 text-transparent animate-pulse flex flex-col rounded-2xl lg:py-5">
            <div className="mb-1 md:text-lg">Loading</div>
            <p className="flex gap-1 mb-1 text-xs sm:text-sm">
                <div className="size-4 shrink-0 xs:mt-1">Loading</div>
                <div>Loading</div>
            </p>
        </div>
    );
}
