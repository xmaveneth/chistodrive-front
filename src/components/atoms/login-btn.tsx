import PrimaryBtn from '@/components/atoms/primary-btn';
import { useCurrentUser } from '@/lib/hooks/useCurrentUser';
import { UserIcon } from '@heroicons/react/16/solid';
import { useNavigate } from 'react-router-dom';

type LoginBtnProps = {
    onClick: () => void;
};
export default function LoginBtn({ onClick }: LoginBtnProps) {
    const navigate = useNavigate();
    const { data: user, isLoading, isError } = useCurrentUser();

    const loggedIn = !(isError || !user);

    const loginClick = () => {
        if (loggedIn) {
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
