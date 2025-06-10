
import Rating from '@mui/material/Rating';
import PrimaryBtn from '@/components/atoms/primary-btn';
import { ArchivedAppointment } from '@/lib/types/user';
import { formatDateForScripts, formatTimeToHHMM } from '@/lib/utils/format-date';


type ShowReviewDialogProps = {
    closeDialog: () => void;
    entry: ArchivedAppointment;
};
export default function ShowReviewDialog({
    closeDialog,
    entry
}: ShowReviewDialogProps) {
    // const { mutate, isPending } = usePostReview(closeDialog);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

if (entry.media == null || entry.comment == null || entry.rating == null) return null;

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
                    <Rating name="read-only" value={entry.rating} readOnly />                </div>
                <div className="rounded-lg bg-white/10 w-full px-4 py-2 min-h-30">{entry.comment}</div>
                <div className='rounded-lg bg-white/10 w-full p-2'>

                    {entry.media.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                            {entry.media.map((file, index) => (
                                <div key={index} className="bg-white rounded-md relative overflow-clip">
                                    <img src={file} alt="" className='object-center object-cover size-full' />
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>

            <PrimaryBtn type="submit" disabled={true} className="w-full">
                Удалить отзыв
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

