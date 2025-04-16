import UserSvg from '@/assets/svgs/user.svg';
import PrimaryBtn from '@/components/atoms/primary-btn';
import { useLogout } from '@/lib/hooks/auth/use-logout';

type AccountHeaderProp = {
    openDialog: () => void;
};
export default function AccountHeader({ openDialog }: AccountHeaderProp) {
    const { mutate: logout, isPending } = useLogout();

    return (
        <div className="flex items-center justify-between mb-4 gap-4 sm:mb-6">
            <div className="w-10 sm:w-12 hidden xs:block">
                <img
                    src={UserSvg}
                    alt="Иконка пользователя"
                    className="w-full object-center object-cover"
                />
            </div>

            <PrimaryBtn
                onClick={() => logout()}
                disabled={isPending}
                className="py-2 text-xs xs:text-sm sm:py-2.5 xs:ml-auto sm:text-base"
            >
                Выйти
            </PrimaryBtn>

            <PrimaryBtn
                onClick={openDialog}
                className="py-2 text-xs xs:text-sm bg-red-700 hover:bg-red-600 sm:py-2.5 sm:text-base"
            >
                Удалить аккаунт
            </PrimaryBtn>
        </div>
    );
}
