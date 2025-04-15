import { useUserContext } from '@/lib/hooks/useUserContext';

export default function AccountEntries() {
    const { user } = useUserContext();

    return <p>Здравствуйте, {user?.name}</p>;
}
