import PrimaryBtn from '@/components/atoms/primary-btn';
import TextField from '@/components/forms/text-field';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateScript } from '@/lib/hooks/scripts/use-create-script';

const scriptSchema = z.object({
    name: z
        .string()
        .min(1, 'Введите название скрипта')
        .max(30, 'Название не должно превышать 30 символов'),
});

type ScriptFormInput = z.infer<typeof scriptSchema>;

type AddScriptDialogProps = {
    closeDialog: () => void;
    carWashId: number;
};
export default function AddScriptDialog({
    closeDialog,
    carWashId,
}: AddScriptDialogProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ScriptFormInput>({
        resolver: zodResolver(scriptSchema),
    });

    const { mutate, isPending } = useCreateScript(carWashId, closeDialog);

    const onSubmit = (data: ScriptFormInput) => {
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
                    placeholder="Введите название скрипта"
                    label="Название скрипта"
                    shouldFocus
                />
            </div>

            <PrimaryBtn
                type="submit"
                className="w-full"
                disabled={isPending}
            >
                Добавить скрипт
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
