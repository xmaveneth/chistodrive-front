import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteUser } from '@/lib/hooks/auth/use-delete-user';

type DeleteUserDialogProps = {
    closeDialog: () => void;
};
export default function DeleteUserDialog({
    closeDialog,
}: DeleteUserDialogProps) {
    const { mutate: deleteUser, isPending } = useDeleteUser();
    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
                disabled={isPending}
                className="w-full"
                onClick={deleteUser}
            >
                Удалить аккаунт
            </PrimaryBtn>
            <PrimaryBtn
                onClick={closeDialog}
                className="w-full bg-input-bg hover:bg-zinc-800"
            >
                Вернуться назад
            </PrimaryBtn>
        </div>
    );
}
