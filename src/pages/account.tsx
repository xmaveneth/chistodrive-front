import { useCurrentUser } from '@/lib/hooks/useCurrentUser';

export default function Account() {
    const { data: user, isLoading, isError } = useCurrentUser();

    if (isLoading) return <p>Загрузка...</p>;
    if (isError || !user) return <p>Вы не вошли в систему</p>;

    return <p>Здравствуйте, {user.name}</p>;
}
