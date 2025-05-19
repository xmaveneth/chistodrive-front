import PrimaryBtn from '@/components/atoms/primary-btn';
import TextField from '@/components/forms/text-field';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCarwashBox } from '@/lib/hooks/boxes/use-create-carwash-box';

const scriptSchema = z.object({
    name: z.string().min(1, 'Введите ФИО'),
});

type BoxFormInput = z.infer<typeof scriptSchema>;

type AddBoxDialogProps = {
    closeDialog: () => void;
    carWashId: number;
};
export default function AddBoxDialog({
    closeDialog,
    carWashId,
}: AddBoxDialogProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BoxFormInput>({
        resolver: zodResolver(scriptSchema),
    });

    const { mutate, isPending } = useCreateCarwashBox(
        carWashId,
        closeDialog
    );

    const onSubmit = (data: BoxFormInput) => {
        mutate(data);
    };

    return (
        <form className="my-10 space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2 my-8">
                <TextField
                    registration={register('name')}
                    type="text"
                    error={errors.name?.message}
                    placeholder="Название бокса"
                    label="Название бокса"
                    shouldFocus
                />
            </div>

            <PrimaryBtn type="submit" className="w-full" disabled={isPending}>
                Добавить бокс 
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

