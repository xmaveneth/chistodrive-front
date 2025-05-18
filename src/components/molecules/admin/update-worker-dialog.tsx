import PrimaryBtn from '@/components/atoms/primary-btn';
import TextField from '@/components/forms/text-field';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Worker } from '@/lib/types/workers';
import { useUpdateCarwashWorker } from '@/lib/hooks/workers/use-update-carwash-worker';

const scriptSchema = z.object({
    id: z.number(),
    full_name: z.string().min(1, 'Введите ФИО'),
    job_title: z.string().min(1, 'Введите должность сотрудника'),
    telephone: z.string().min(1, 'Введите телефон'),
});

type WorkerFormInput = z.infer<typeof scriptSchema>;

type UpdateWorkerDialogProps = {
    closeDialog: () => void;
    carWashId: number;
    selectedWorker: Worker;
};
export default function UpdateWorkerDialog({
    closeDialog,
    carWashId,
    selectedWorker,
}: UpdateWorkerDialogProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WorkerFormInput>({
        resolver: zodResolver(scriptSchema),
        defaultValues: {
            id: selectedWorker.id,
            full_name: selectedWorker.full_name,
            job_title: selectedWorker.job_title,
            telephone: selectedWorker?.telephone ?? '',
        },
    });

    const { mutate, isPending } = useUpdateCarwashWorker(
        carWashId,
        closeDialog
    );

    const onSubmit = (data: WorkerFormInput) => {
        mutate(data);
    };

    return (
        <form className="my-10 space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2 my-8">
                <TextField
                    registration={register('full_name')}
                    type="text"
                    error={errors.full_name?.message}
                    placeholder="Введите ФИО"
                    label="ФИО"
                    shouldFocus
                />
                <TextField
                    registration={register('job_title')}
                    type="text"
                    error={errors.job_title?.message}
                    placeholder="Введите должность сотрудника"
                    label="Должность"
                    shouldFocus
                />
                <TextField
                    registration={register('telephone')}
                    type="text"
                    error={errors.telephone?.message}
                    placeholder="Введите номер телефона"
                    label="Телефон"
                    shouldFocus
                />
            </div>

            <PrimaryBtn type="submit" className="w-full" disabled={isPending}>
                Сохранить
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
