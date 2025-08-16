import PrimaryBtn from '@/components/atoms/primary-btn';
import TextField from '@/components/forms/text-field';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCarwashWorker } from '@/lib/hooks/workers/use-create-carwash-worker';

const scriptSchema = z.object({
    full_name: z
        .string()
        .min(1, 'Введите ФИО')
        .max(50, 'Имя не должно превышать 50 символов'),
    job_title: z
        .string()
        .min(1, 'Введите должность сотрудника')
        .max(50, 'Должность не должна превышать 50 символов'),
    telephone: z
        .string()
        .min(1, 'Введите телефон')
        .transform((val) => val.replace(/[\s-]/g, ''))
        .refine(
            (val) => /^(?:\+7|8)\d{10}$/.test(val),
            'Введите корректный номер телефона (например +7 915 123-45-67)'
        ),
});

type WorkerFormInput = z.infer<typeof scriptSchema>;

type AddWorkerDialogProps = {
    closeDialog: () => void;
    carWashId: number;
};
export default function AddWorkerDialog({
    closeDialog,
    carWashId,
}: AddWorkerDialogProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WorkerFormInput>({
        resolver: zodResolver(scriptSchema),
    });

    const { mutate, isPending } = useCreateCarwashWorker(
        carWashId,
        closeDialog
    );

    const onSubmit = (data: WorkerFormInput) => {
        mutate(data);
    };

    return (
        <form
            className="my-10 space-y-2"
            onSubmit={handleSubmit(onSubmit)}
        >
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

            <PrimaryBtn
                type="submit"
                className="w-full"
                disabled={isPending}
            >
                Добавить сотрудника
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
