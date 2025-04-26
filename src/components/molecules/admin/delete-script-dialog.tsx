import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteScript } from '@/lib/hooks/scripts/use-delete-script';
import { Script } from '@/lib/types/scripts';

type DeleteScriptDialogProps = {
    closeDialog: () => void;
    selectedScript: Script | null;
};
export default function DeleteScriptDialog({
    closeDialog,
    selectedScript,
}: DeleteScriptDialogProps) {
    const { mutate: deleteScript, isPending } = useDeleteScript(closeDialog);

    function handleClick() {
        if (selectedScript == null) return;

        deleteScript(selectedScript.script_id);
    }

    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
                disabled={isPending}
                onClick={handleClick}
                className="w-full"
            >
                Удалить скрипт
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
