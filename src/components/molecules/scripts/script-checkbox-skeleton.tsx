import { range } from '@/lib/utils/range';

export default function ScriptCheckboxSkeleton() {
    return (
        <div className="mt-6 md:mt-8 grid gap-3">
            {range(1, 7).map((index) => (
                <div
                    key={`skeleton-${index}`}
                    className="rounded-sm bg-gray-200 text-transparent animate-pulse w-max text-sm md:text-base"
                >
                    loading loading loading
                </div>
            ))}
        </div>
    );
}
