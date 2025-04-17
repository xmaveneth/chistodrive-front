import { useCurrentUser } from '@/lib/hooks/auth/use-current-user';
export default function UserData() {
    const { isLoading, data: user } = useCurrentUser();

    return (
        <div className="space-y-2 mb-7 sm:mb-8">
            <p>
                <span className="text-text-muted">Имя: </span>
                { isLoading ? <Skeleton /> : user?.name}
            </p>
            <p>
                <span className="text-text-muted">Телефон: </span>
                { isLoading ? <Skeleton /> : user?.telephone}
            </p>
        </div>
    );
}

function Skeleton() {
    return (
        <span className="bg-gray-400 text-transparent animate-pulse rounded-sm">
            loading loading
        </span>
    );
}
