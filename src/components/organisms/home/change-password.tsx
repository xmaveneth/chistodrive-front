import PrimaryBtn from '@/components/atoms/primary-btn';
import PasswordField from '@/components/forms/password-field';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {
    resetPassword,
    ResetPasswordInput,
} from '@/services/api/auth';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import notify from '@/lib/utils/notify';

const finalFormSchema = z
    .object({
        password: z
            .string()
            .min(6, 'Пароль должен содержать минимум 6 символов'),
        confirmPassword: z.string().min(1, 'Повторите пароль'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export type FinalFormInputs = z.infer<typeof finalFormSchema>;

export default function ChangePassword() {
    const token = "";

    const {
        register: finalFormRegister,
        handleSubmit: finalFormSubmit,
        formState: { errors: finalFormErrors },
        setError: setFinalFormError,
    } = useForm<FinalFormInputs>({
        resolver: zodResolver(finalFormSchema),
    });


    const submitFinalFormRequest = useMutation({
        mutationFn: ({
            password,
            confirm_password,
            token,
        }: ResetPasswordInput) =>
            resetPassword({
                password,
                confirm_password,
                token,
            }),
        onSuccess: () => {
            setTimeout(() => {
                notify('Пароль успешно изменен!');
            }, 500);
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.ru_message;
                setFinalFormError('password', {
                    message:
                        typeof detail === 'string'
                            ? detail
                            : 'Ошибка валидации данных. Попробуйте позже.',
                });
            } else {
                setFinalFormError('password', {
                    message: 'Ошибка валидации данных. Попробуйте позже.',
                });
            }
        },
    });


    const onFinalFormSubmit = (data: FinalFormInputs) => {
        submitFinalFormRequest.mutate({
            password: data.password,
            confirm_password: data.confirmPassword,
            token: token,
        });
    };

    return (
        <form
            onSubmit={finalFormSubmit(onFinalFormSubmit)}
            className="space-y-4 text-sm mt-3"
        >
            <PasswordField
                label="Пароль"
                error={finalFormErrors.password?.message}
                registration={finalFormRegister('password')}
            />

            <PasswordField
                label="Повторите пароль"
                error={finalFormErrors.confirmPassword?.message}
                registration={finalFormRegister('confirmPassword')}
            />

            <PrimaryBtn
                type="submit"
                className="w-full"
            >
                Сохранить
            </PrimaryBtn>
        </form>
    );
}
