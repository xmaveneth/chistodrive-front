export default function AccountItemSkeleton() {
    return (
        <li className="w-full px-6 py-3 bg-gray-400 text-transparent animate-pulse flex items-center gap-5 rounded-full lg:py-5">
            <div className="h-5 shrink-0 lg:h-8">Loading</div>
        </li>
    );
}
