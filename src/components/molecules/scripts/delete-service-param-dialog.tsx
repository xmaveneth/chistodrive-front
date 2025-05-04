import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteScriptService } from '@/lib/hooks/scripts/use-delete-script-service';
import { Service } from '@/lib/types/service-params';
import { useParams } from 'react-router-dom';

type DeleteServiceParamDialogProps = {
    closeDialog: () => void;
    deleteScriptService: Service | null;
};

export default function DeleteServiceParamDialog({
    closeDialog,
    deleteScriptService,
}: DeleteServiceParamDialogProps) {
    const { id } = useParams();

    const { mutate, isPending } = useDeleteScriptService(
        Number(id),
        closeDialog
    );

    function handleClick() {
        if (deleteScriptService == null) return;

        mutate(deleteScriptService.script_service_id);
    }

    return (
        <div className="my-6">
            <PrimaryBtn
                disabled={isPending}
                onClick={handleClick}
                className="w-full mb-3"
            >
                Удалить
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
