
import Rating from '@mui/material/Rating';
import PrimaryBtn from '@/components/atoms/primary-btn';
import { ArchivedAppointment } from '@/lib/types/user';
import { formatDateForScripts, formatTimeToHHMM } from '@/lib/utils/format-date';
import { useDeleteReview } from '@/lib/hooks/reviews/use-delete-review';
import { useState } from 'react';


type ShowReviewDialogProps = {
    closeDialog: () => void;
    entry: ArchivedAppointment;
};
export default function ShowReviewDialog({
    closeDialog,
    entry
}: ShowReviewDialogProps) {
    const { mutate, isPending } = useDeleteReview(closeDialog);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (entry.review == null) return;

        mutate({ review_uuid: entry.review.review_uuid })
    };

    if (entry.review?.media == null || entry.review.comment == null || entry.review.rating == null) return null;

    return (
        <form className="my-10 space-y-2" onSubmit={(e) => { handleSubmit(e) }} encType='multipart/form-data'>
            <div className="space-y-2 my-8">
                <TitleLine title='Автомойка' description={entry.car_wash_name} />
                <TitleLine title='Время и дата визита' description={`${formatDateForScripts(entry.date)} ${formatTimeToHHMM(entry.time)}`} />
                <TitleLine title='Услуга' description={entry.service_name} />
            </div>

            <div className="space-y-2 my-8">
                <div className='rounded-lg bg-white/10 w-full px-4 py-2 flex items-center justify-between gap-2'>
                    <div className='text-sm'>Ваша оценка</div>
                    <Rating name="read-only" value={entry.review.rating} readOnly />
                </div>
                <div className="rounded-lg bg-white/10 w-full px-4 py-2 text-sm">Ваш комментарий: <span className='text-white'>{entry.review.comment}</span></div>
                <div className='rounded-lg bg-white/10 w-full p-2'>

                    {entry.review.media.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                            {entry.review.media.map((file, index) => (
                                <ReviewImage key={index} img={file} />
                            ))}
                        </div>
                    )}

                </div>

                {entry.review_reply && <div className="rounded-lg bg-white/10 w-full px-4 py-2 text-sm">Ответ на отзыв: <span className='text-white'>{entry.review_reply.comment}</span></div>}
            </div>

            <PrimaryBtn type="submit" disabled={isPending} className="w-full">
                Удалить комментарий
            </PrimaryBtn>

            <PrimaryBtn
                type="button"
                onClick={closeDialog}
                className="w-full bg-input-bg hover:bg-zinc-800"
            >
                Вернуться назад
            </PrimaryBtn>
        </form>
    );
}
type TitleLineProps = {
    title: string;
    description: string;
}

function TitleLine({ title, description }: TitleLineProps) {
    return (<div className="text-sm">{title}: <span className="text-white">{description}</span></div>)
}
type ReviewImageProps = {
    img: string;
}
function ReviewImage({ img }: ReviewImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (<div className="bg-black rounded-md relative min-h-20 overflow-clip">
        <img onLoad={() => setIsLoading(false)} src={img} alt="" className='object-center object-cover size-full' />
        {isLoading && (
            <div className="inset-0 absolute z-10 flex items-center justify-center">
                <span className='card-loader'></span>
            </div>
        )
        }</div>
    )
}
