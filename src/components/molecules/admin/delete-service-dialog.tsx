import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteCarwashService } from '@/lib/hooks/services/use-delete-carwash-service';
import { Service } from '@/lib/types/services';
import { useParams } from 'react-router-dom';

type DeleteServiceDialogProps = {
    closeDialog: () => void;
    selectedService: Service | null;
};
export default function DeleteServiceDialog({
    closeDialog,
    selectedService,
}: DeleteServiceDialogProps) {
    const { id } = useParams();
    const parsedId = Number(id);

    const { mutate: deleteService, isPending } = useDeleteCarwashService(
        parsedId,
        closeDialog
    );

    function handleClick() {
        if (selectedService == null) return;

        deleteService({ service_id: selectedService.service_id});
    }

    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
                disabled={isPending}
                onClick={handleClick}
                className="w-full"
            >
                Удалить услугу 
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

