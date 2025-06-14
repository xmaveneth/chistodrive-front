import PrimaryBtn from '@/components/atoms/primary-btn';
import { useDeleteReviewReply } from '@/lib/hooks/reviews/use-delete-review-reply';
import { AdminReviewReply } from '@/lib/types/reviews';

type DeleteReviewReplyDialogProps = {
    closeDialog: () => void;
    reply: AdminReviewReply; 
};
export default function DeleteReviewReplyDialog({
    closeDialog,
    reply
}: DeleteReviewReplyDialogProps) {

    const { mutate, isPending } = useDeleteReviewReply(
        closeDialog
    );

   function handleClick() {
        if (reply == null) return;

        mutate({reply_uuid: reply.uuid});
    }

    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
                disabled={isPending}
                onClick={handleClick}
                className="w-full"
            >
                Удалить ответ 
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

