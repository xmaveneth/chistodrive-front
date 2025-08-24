import PrimaryBtn from '@/components/atoms/primary-btn';
import PasswordField from '@/components/forms/password-field';
import TextField from '@/components/forms/text-field';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { loginUser } from '@/services/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Button } from '@headlessui/react';
import { useAuthContext } from '@/lib/hooks/context/use-auth-context';
import notify from '@/lib/utils/notify';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';

const loginSchema = z.object({
    telephone: z
        .string()
        .transform((val) => val.replace(/[\s-]/g, '')),
    password: z.string().min(1, 'Введите пароль'),
});

        // .refine(
        //     (val) => /^(?:\+7|8)\d{10}$/.test(val),
        //     'Введите корректный номер телефона (например +7 915 123-45-67)'
        // ),


type LoginFormInputs = z.infer<typeof loginSchema>;

type LoginProps = {
    onClick: () => void;
    onForgotPasswordClick: () => void;
};
export default function Login({ onClick, onForgotPasswordClick }: LoginProps) {
    const queryClient = useQueryClient();
    const { toggleLoginDialog } = useAuthContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            // saveAuthTokens(data);

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CURRENT_USER],
            });
            setTimeout(() => {
                notify('Добро пожаловать!');
                toggleLoginDialog(false);
            }, 500);
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail?.ru_message;
                setError('telephone', {
                    message:
                        typeof detail === 'string'
                            ? detail
                            : 'Ошибка входа в аккаунт. Попробуйте позже.',
                });
            } else {
                setError('telephone', {
                    message: 'Ошибка входа. Попробуйте позже.',
                });
            }
        },
    });

    const onSubmit = (data: LoginFormInputs) => {
        mutation.mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-sm mt-3"
        >
            <TextField
                registration={register('telephone')}
                type="tel"
                error={errors.telephone?.message}
                placeholder="+7 (999) 999 99 99"
                label="Телефон"
                shouldFocus
            />

            <div>
                <PasswordField
                    label="Пароль"
                    error={errors.password?.message}
                    registration={register('password')}
                />

                <Button
                    onClick={onForgotPasswordClick}
                    className="underline mt-2 text-xs ml-2 underline-offset-3 text-center cursor-pointer"
                >
                    Забыли пароль?
                </Button>
            </div>
            <PrimaryBtn
                type="submit"
                className="w-full"
            >
                Войти
            </PrimaryBtn>

            <Button
                onClick={onClick}
                className="underline underline-offset-3 text-center cursor-pointer"
            >
                У вас еще нет аккаунта? Зарегистироваться
            </Button>
        </form>
    );
}
