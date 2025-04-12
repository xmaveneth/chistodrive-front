import PrimaryBtn from '@/components/atoms/primary-btn';
import PasswordField from '@/components/forms/password-field';
import TextField from '@/components/forms/text-field';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { loginUser } from '@/services/api/auth';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Button } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
    telephone: z
        .string()
        .regex(/^\+?\d{10,15}$/, 'Введите правильный номер телефона'),
    password: z.string().min(1, 'Введите пароль'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

type LoginProps = {
    onClick: () => void;
}
export default function Login({onClick}: LoginProps) {
    const navigate = useNavigate();

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
            navigate('/account');
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                setError('telephone', {
                    message: 'Данный пользователь не зарегистрирован.',
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

            <PasswordField
                label="Пароль"
                error={errors.password?.message}
                registration={register('password')}
            />

            <PrimaryBtn type="submit" className="w-full">
                Войти
            </PrimaryBtn>

            <Button onClick={onClick} className="underline underline-offset-3 text-center cursor-pointer">
                У вас еще нет аккаунта? Зарегистироваться
            </Button>
        </form>
    );
}
