import PrimaryBtn from '@/components/atoms/primary-btn';
import { UserIcon } from '@heroicons/react/16/solid';

type LoginBtnProps = {
    onClick: () => void;
};
export default function LoginBtn({ onClick }: LoginBtnProps) {
    return (
        <PrimaryBtn onClick={onClick} className="py-2">
            <UserIcon className="size-3" aria-hidden="true" />
            Войти
        </PrimaryBtn>
    );
}
