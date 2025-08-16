import UserSvg from '@/assets/svgs/user.svg';
import AdminItemBtn from '@/components/atoms/admin-item-btn';
import { useIsCurrentUserAdmin } from '@/lib/hooks/auth/use-is-current-user-admin';
import { useLogout } from '@/lib/hooks/auth/use-logout';
import useClickOutside from '@/lib/hooks/utils/use-click-outside';
import useToggle from '@/lib/hooks/utils/use-toggle';
import { Transition } from '@headlessui/react';
import { Ellipsis, LogOut, ShieldUser, UserX } from 'lucide-react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type AccountHeaderProp = {
    openDialog: () => void;
    openChangePasswordDialog: () => void;
};
export default function AccountHeader({ openDialog, openChangePasswordDialog }: AccountHeaderProp) {
    const { mutate: logout, isPending } = useLogout();
    const [showActions, toggleActions] = useToggle(false);
    const { data: isAdmin } = useIsCurrentUserAdmin();
    const navigate = useNavigate();

    const modalRef = useRef(null);

    useClickOutside(modalRef, () => {
        if (showActions) toggleActions(false);
    });

    return (
        <div className="flex items-center justify-between mb-4 gap-4 sm:mb-6 relative">
            <div className="w-10 sm:w-12 block">
                <img
                    src={UserSvg}
                    alt="Иконка пользователя"
                    className="w-full object-center object-cover"
                />
            </div>

            <div ref={modalRef}>
                <button
                    onClick={() => toggleActions()}
                    className="aspect-square rounded-full bg-light-bg p-2 cursor-pointer transition-scale duration-250 ease-in hover:scale-110"
                >
                    <Ellipsis className="text-white size-6 sm:size-8" />
                </button>
                <Transition show={showActions}>
                    <div className="bg-light-bg absolute top-0 right-12 sm:right-16 flex flex-wrap items-center gap-4 sm:gap-6 rounded-xl p-4 transition duration-200 ease-in data-[closed]:opacity-0 data-[closed]:scale-x-50 origin-right">
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
                            onClick={openChangePasswordDialog}
                            className="text-xs xs:text-sm"
                        >
                            <UserX className="text-btn-bg size-4" />
                            Изменить пароль
                        </AdminItemBtn>

                        {isAdmin && (
                            <AdminItemBtn
                                onClick={() => navigate('/admin')}
                                className="text-xs xs:text-sm"
                            >
                                <ShieldUser className="text-btn-bg size-4" />
                                Администрирование
                            </AdminItemBtn>
                        )}
                    </div>
                </Transition>
            </div>
        </div>
    );
}
