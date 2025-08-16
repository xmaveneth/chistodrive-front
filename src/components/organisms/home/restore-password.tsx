import PrimaryBtn from '@/components/atoms/primary-btn';
import PasswordField from '@/components/forms/password-field';
import TextField from '@/components/forms/text-field';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {
    resetPassword,
    ResetPasswordInput,
    sendPasswordResetEmail,
} from '@/services/api/auth';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useAuthContext } from '@/lib/hooks/context/use-auth-context';
import notify from '@/lib/utils/notify';

const initialFormSchema = z.object({
    email: z.string().email('Введите правильный email'),
});

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

export type InitialFormInputs = z.infer<typeof initialFormSchema>;
export type FinalFormInputs = z.infer<typeof finalFormSchema>;

export default function RestorePassword() {
    const { toggleForgotPasswordDialog, toggleLoginDialog } = useAuthContext();

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const {
        register: initialFormRegister,
        handleSubmit: initialFormSubmit,
        formState: { errors: initialFormErrors },
        setError: setInitialFormError,
    } = useForm<InitialFormInputs>({
        resolver: zodResolver(initialFormSchema),
    });

    const {
        register: finalFormRegister,
        handleSubmit: finalFormSubmit,
        formState: { errors: finalFormErrors },
        setError: setFinalFormError,
    } = useForm<FinalFormInputs>({
        resolver: zodResolver(finalFormSchema),
    });

    const submitInitialFormRequest = useMutation({
        mutationFn: ({ email }: InitialFormInputs) =>
            sendPasswordResetEmail({ email }),
        onSuccess: (data) => {
            notify(data.ru_message);
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.ru_message;
                setInitialFormError('email', {
                    message:
                        typeof detail === 'string'
                            ? detail
                            : 'Ошибка отправки сообщения. Попробуйте позже.',
                });
            } else {
                setInitialFormError('email', {
                    message: 'Ошибка отправки сообщения. Попробуйте позже.',
                });
            }
        },
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
            notify("Пароль успешно изменен!");
            toggleLoginDialog(true);
            toggleForgotPasswordDialog(false);
        },
        onError: (error: unknown) => {
            console.error(error)
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

    const onInitialFormSubmit = (data: InitialFormInputs) => {
        submitInitialFormRequest.mutate(data);
    };

    const onFinalFormSubmit = (data: FinalFormInputs) => {
        if (!token) return;
        submitFinalFormRequest.mutate({
            password: data.password,
            confirm_password: data.confirmPassword,
            token: token,
        });
    };

    return (
        <>
            {token == null ? (
                <form
                    onSubmit={initialFormSubmit(onInitialFormSubmit)}
                    className="space-y-4 text-sm mt-3"
                >
                    <TextField
                        registration={initialFormRegister('email')}
                        type="email"
                        error={initialFormErrors.email?.message}
                        placeholder="Ваш emai"
                        label="Ваш email"
                    />

                    <PrimaryBtn
                        type="submit"
                        className="w-full"
                    >
                        Отправить email
                    </PrimaryBtn>
                </form>
            ) : (
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
            )}
        </>
    );
}
