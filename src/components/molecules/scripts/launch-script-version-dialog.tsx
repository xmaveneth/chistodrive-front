import PrimaryBtn from '@/components/atoms/primary-btn';
import { useLaunchScriptVersion } from '@/lib/hooks/scripts/use-launch-script-version';
import { useParams } from 'react-router-dom';

type LaunchScriptVersionDialogProps = {
    closeDialog: () => void;
};

export default function LaunchScriptVersionDialog({
    closeDialog,
}: LaunchScriptVersionDialogProps) {
    const { carwashId, id } = useParams();

    const { mutate, isPending } = useLaunchScriptVersion(closeDialog, Number(carwashId));

    function handleClick() {
        mutate({ script_version_id: Number(id) });
    }

    return (
        <div className="my-6">
            <PrimaryBtn
                disabled={isPending}
                onClick={handleClick}
                className="w-full mb-3"
            >
                Продолжить
            </PrimaryBtn>

            <PrimaryBtn
                type="button"
                onClick={closeDialog}
                className="w-full bg-input-bg hover:bg-zinc-800"
            >
                Вернуться назад
            </PrimaryBtn>
        </div>
    );
}
