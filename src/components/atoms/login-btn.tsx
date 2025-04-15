import PrimaryBtn from '@/components/atoms/primary-btn';
import { useUserContext } from '@/lib/hooks/useUserContext';
import { UserIcon } from '@heroicons/react/16/solid';
import { useNavigate } from 'react-router-dom';

type LoginBtnProps = {
    onClick: () => void;
};
export default function LoginBtn({ onClick }: LoginBtnProps) {
    const navigate = useNavigate();
    const { isLoading, isLoggedIn } = useUserContext();

    const loginClick = () => {
        if (isLoggedIn) {
            navigate('/account');
        } else {
            onClick();
        }
    };

    return (
        <PrimaryBtn disabled={isLoading} onClick={loginClick} className="py-2">
            <UserIcon className="size-3" aria-hidden="true" />
            Войти
        </PrimaryBtn>
    );
}
