export default function CarouselSkeleton() {
    return Array.from({ length: 8 }, (_, index) => (
        <CarouselCardSkeleton key={`skeleton-card-${index}`} />
    ));
}

function CarouselCardSkeleton() {
    return (
        <div className="w-[220px] sm:w-[367px] md:w-[331px] shrink-0 ring-1 ring-border rounded-lg text-transparent animate-pulse">
            <div className="overflow-clip relative aspect-[1.55/1] rounded-lg bg-gray-100/50"></div>
            <div className="p-2 pb-3.5 sm:p-3 sm:pb-4.5">
                <p className="flex items-start gap-1 mb-2.5 text-xs sm:text-sm text-transparent bg-gray-100/50 rounded-sm">
                    loading
                </p>
                <div className="flex items-center mb-3 bg-gray-100/50 rounded-sm">
                    loading
                </div>
                <p className="mb-2.5 text-lg sm:text-xl bg-gray-100/50 rounded-sm">loading</p>
                <p className="mb-2.5 text-xs sm:text-sm min-h-26 sm:min-h-30 bg-gray-100/50 rounded-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cumque deserunt eius modi optio facere reiciendis
                    consequatur rerum veritatis commodi vel?
                </p>
                <p className="mb-2.5 text-sm sm:text-base">loading</p>
                <p className="text-xs sm:text-sm bg-gray-100/50 rounded-sm">
                    Узнать подробнее
                </p>
            </div>
        </div>
    );
}

