import PrimaryBtn from '@/components/atoms/primary-btn';
import TextField from '@/components/forms/text-field';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateScriptVersion } from '@/lib/hooks/scripts/use-create-script-version';

const ScriptVersionSchema = z.object({
    name: z.string().min(1, 'Введите название версии скрипта'),
});

type ScriptVersionFormInput = z.infer<typeof ScriptVersionSchema>;

type AddScriptVersionDialogProps = {
    closeDialog: () => void;
    scriptId: number | null;
};
export default function AddScriptVersionDialog({
    closeDialog,
    scriptId,
}: AddScriptVersionDialogProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ScriptVersionFormInput>({
        resolver: zodResolver(ScriptVersionSchema),
    });

    const { mutate, isPending } =
        useCreateScriptVersion(closeDialog);


    const onSubmit = (data: ScriptVersionFormInput) => {
        if (scriptId == null) return;

        mutate({ script_id: scriptId, name: data.name });

    };

    return (
        <form className="my-10 space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2 my-8">
                <TextField
                    registration={register('name')}
                    type="text"
                    error={errors.name?.message}
                    placeholder="Введите название версии скрипта"
                    label="Название версии скрипта"
                    shouldFocus
                />
            </div>

            <PrimaryBtn type="submit" className="w-full" disabled={isPending}>
                Добавить версию скрипта
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
