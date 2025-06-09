
import PrimaryBtn from '@/components/atoms/primary-btn';
import { usePostReview } from '@/lib/hooks/reviews/use-post-review';
import { Appointment } from '@/lib/types/user';
import { formatDateForScripts, formatTimeToHHMM } from '@/lib/utils/format-date';


type AddReviewDialogProps = {
    closeDialog: () => void;
    entry: Appointment;
};
export default function AddReviewDialog({
    closeDialog,
    entry
}: AddReviewDialogProps) {
    const { mutate, isPending } = usePostReview(closeDialog);

    const onSubmit = (data: FormData) => {
        mutate(data);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // onSubmit();
    }

    return (
        <form className="my-10 space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-2 my-8">
                <TitleLine title='Автомойка' description={entry.car_wash_name} />
                <TitleLine title='Время и дата визита' description={`${formatDateForScripts(entry.date)} ${formatTimeToHHMM(entry.time)}`} />
                <TitleLine title='Услуга' description={entry.service_name} />
            </div>

            <PrimaryBtn type="submit" className="w-full">
                Оставить отзыв
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

