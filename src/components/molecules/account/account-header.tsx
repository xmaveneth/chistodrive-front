import UserSvg from '@/assets/svgs/user.svg';
import AdminItemBtn from '@/components/atoms/admin-item-btn';
import { useLogout } from '@/lib/hooks/auth/use-logout';
import useToggle from '@/lib/hooks/utils/use-toggle';
import { Transition } from '@headlessui/react';
import { Ellipsis, LogOut, ShieldUser, UserX } from 'lucide-react';

type AccountHeaderProp = {
    openDialog: () => void;
};
export default function AccountHeader({ openDialog }: AccountHeaderProp) {
    const { mutate: logout, isPending } = useLogout();
    const [showActions, toggleActions] = useToggle(false);

    return (
        <div className="flex items-center justify-between mb-4 gap-4 sm:mb-6 relative">
            <div className="w-10 sm:w-12 block">
                <img
                    src={UserSvg}
                    alt="Иконка пользователя"
                    className="w-full object-center object-cover"
                />
            </div>

            <button onClick={() => toggleActions()} className="aspect-square rounded-full bg-light-bg p-2 cursor-pointer transition-scale duration-250 ease-in hover:scale-110">
                <Ellipsis className="text-white size-6 sm:size-8" />
            </button>

            <Transition show={showActions}>
                <div className="bg-light-bg absolute top-0 right-12 sm:right-16 flex flex-wrap items-center gap-4 sm:gap-6 rounded-xl px-4 py-3 transition duration-200 ease-in data-[closed]:opacity-0 data-[closed]:scale-x-50 origin-right">
                    <AdminItemBtn
                        disabled={isPending}
                        onClick={() => logout()}
                        className="text-xs xs:text-sm"
                    >
                        <LogOut className="text-btn-bg size-4" />
                        Выход
                    </AdminItemBtn>

                    <AdminItemBtn
                        onClick={openDialog}
                        className="text-xs xs:text-sm"
                    >
                        <UserX className="text-btn-bg size-4" />
                        Удалить аккаунт
                    </AdminItemBtn>

                    <AdminItemBtn
                        onClick={() => {}}
                        className="text-xs xs:text-sm"
                    >
                        <ShieldUser className="text-btn-bg size-4" />
                        Администрирование
                    </AdminItemBtn>
                </div>
            </Transition>
        </div>
    );
}
