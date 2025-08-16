import PrimaryBtn from '@/components/atoms/primary-btn';
import TextField from '@/components/forms/text-field';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateCarwashBox } from '@/lib/hooks/boxes/use-update-carwash-box';
import { Box } from '@/lib/types/boxes';

const scriptSchema = z.object({
    name: z
        .string()
        .min(1, 'Введите ФИО')
        .max(30, 'Название бокса не должно превышать 30 символов'),

    id: z.number(),
});

type BoxFormInput = z.infer<typeof scriptSchema>;

type UpdateBoxDialogProps = {
    closeDialog: () => void;
    carWashId: number;
    selectedBox: Box;
};
export default function UpdateBoxDialog({
    closeDialog,
    carWashId,
    selectedBox,
}: UpdateBoxDialogProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BoxFormInput>({
        resolver: zodResolver(scriptSchema),
        defaultValues: {
            id: selectedBox.id,
            name: selectedBox.name,
        },
    });

    const { mutate, isPending } = useUpdateCarwashBox(carWashId, closeDialog);

    const onSubmit = (data: BoxFormInput) => {
        mutate(data);
    };

    return (
        <form
            className="my-10 space-y-2"
            onSubmit={handleSubmit(onSubmit)}
        >
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

            <PrimaryBtn
                type="submit"
                className="w-full"
                disabled={isPending}
            >
                Обновить информацию бокса
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
