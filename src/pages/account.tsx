import { useUserContext } from '@/lib/hooks/useUserContext';

export default function Account() {
    const { isLoading, isLoggedIn, user } = useUserContext();

    if (isLoading) return <p>Загрузка...</p>;
    if (!isLoggedIn) return <p>Вы не вошли в систему</p>;

    return <p>Здравствуйте, {user?.name}</p>;
}
