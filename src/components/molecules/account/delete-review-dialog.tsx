import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteReview } from '@/lib/hooks/reviews/use-delete-review';

type DeleteReviewDialogProps = {
    closeDialog: () => void;
    review_uuid: string;
};
export default function DeleteReviewDialog({
    closeDialog,
    review_uuid
}: DeleteReviewDialogProps) {

    const { mutate, isPending } = useDeleteReview(closeDialog);

    function handleClick() {
        if (review_uuid == null) return;

        mutate({ review_uuid: review_uuid })
    }

    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
                disabled={isPending}
                onClick={handleClick}
                className="w-full"
            >
                Удалить комментарий
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

