import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteScriptVersion } from '@/lib/hooks/scripts/use-delete-script-version';
import { ScriptVersion } from '@/lib/types/scripts';

type DeleteScriptVersionDialogProps = {
    closeDialog: () => void;
    selectedScriptVersion: ScriptVersion | null;
};
export default function DeleteScriptVersionDialog({
    closeDialog,
    selectedScriptVersion,
}: DeleteScriptVersionDialogProps) {
    const { mutate: DeleteScriptVersion, isPending } = useDeleteScriptVersion(closeDialog);

    function handleClick() {
        if (selectedScriptVersion == null) return;

        DeleteScriptVersion(selectedScriptVersion.version_id);
    }

    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
                disabled={isPending}
                onClick={handleClick}
                className="w-full"
            >
                Удалить версию скрипта
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
