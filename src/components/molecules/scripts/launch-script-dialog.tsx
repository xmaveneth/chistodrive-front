import PrimaryBtn from '@/components/atoms/primary-btn';
import { useLaunchScript } from '@/lib/hooks/scripts/use-launch-script';
import { useParams } from 'react-router-dom';

type LaunchScriptDialogProps = {
    closeDialog: () => void;
};

export default function LaunchScriptDialog({
    closeDialog,
}: LaunchScriptDialogProps) {
    const { carwashId, id } = useParams();

    const { mutate, isPending } = useLaunchScript(closeDialog, Number(carwashId));

    function handleClick() {
        mutate({ script_id: Number(id) });
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
