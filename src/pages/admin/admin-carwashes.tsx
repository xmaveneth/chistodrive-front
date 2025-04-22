import { AdminCarwashCard } from '@/components/atoms/admin-carwash-card';
import AdminItemSkeleton from '@/components/atoms/admin-item-skeleton';
import NoItemsMessage from '@/components/atoms/no-items-message';
import { useAdminCarwashes } from '@/lib/hooks/carwashes/use-admin-carwashes';
import { range } from '@/lib/utils/range';

export default function AdminCarwashes() {
    const { data: carwashes, isLoading } = useAdminCarwashes();

    const renderSkeletonItems = () => {
        return range(1, 3).map((index) => (
            <AdminItemSkeleton key={`admin-carwash-${index}`} />
        ));
    };

    const renderCarwashes = () => {
        if (carwashes == null) return null;

        if (carwashes.data.length <= 0) return <NoItemsMessage />;

        return carwashes.data.map((carwash, idx) => (
            <AdminCarwashCard
                key={`admin-carwash-card-${idx}`}
                carwash={carwash}
            />
        ));
    };

    return (
        <div className="grid gap-3 md:gap-5 md:grid-cols-2">
            {isLoading ? renderSkeletonItems() : renderCarwashes()}
        </div>
    );
}
