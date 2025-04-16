import PrimaryBtn from '@/components/atoms/primary-btn';
import PasswordField from '@/components/forms/password-field';
import TextField from '@/components/forms/text-field';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { signupUser } from '@/services/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Button } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import CheckboxField from '@/components/forms/checkbox-field';
import { useAuthContext } from '@/lib/hooks/context/use-auth-context';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
const signupSchema = z
    .object({
        name: z.string().min(1, 'Введите имя'),
        telephone: z
            .string()
            .regex(/^\+?\d{10,15}$/, 'Введите правильный номер телефона'),
        password: z
            .string()
            .min(6, 'Пароль должен содержать минимум 6 символов'),
        confirmPassword: z.string().min(1, 'Повторите пароль'),
        policy: z.literal(true, {
            errorMap: () => ({
                message: 'Вы должны принять политику конфиденциальности',
            }),
        }),
        agreement: z.literal(true, {
            errorMap: () => ({
                message: 'Вы должны принять пользовательское соглашение',
            }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export type SignupFormInputs = z.infer<typeof signupSchema>;

type SignupProps = {
    onClick: () => void;
};

export default function Signup({ onClick }: SignupProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { toggleSignupDialog } = useAuthContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
    } = useForm<SignupFormInputs>({
        resolver: zodResolver(signupSchema),
    });

    const mutation = useMutation({
        mutationFn: ({ name, telephone, password }: SignupFormInputs) =>
            signupUser({ name, telephone, password }),
        onSuccess: (data) => {
             Cookies.set('access_token', data.access_token, {
                secure: true,
                sameSite: 'Strict',
            });
            Cookies.set('refresh_token', data.refresh_token, {
                secure: true,
                sameSite: 'Strict',
            });

            queryClient.invalidateQueries({ queryKey: ['current-user'] });
         
            setTimeout(() => {
                navigate('/account');
                toast("Пользователь успешно зарегистрирован!");
                toggleSignupDialog(false);
            }, 500);
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail;
                setError('telephone', {
                    message:
                        typeof detail === 'string'
                            ? detail
                            : 'Ошибка регистрации. Попробуйте позже.',
                });
            } else {
                setError('telephone', {
                    message: 'Ошибка регистрации. Попробуйте позже.',
                });
            }
        },
    });

    const onSubmit = (data: SignupFormInputs) => {
        mutation.mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-sm mt-3"
        >
            <TextField
                registration={register('name')}
                type="text"
                error={errors.name?.message}
                placeholder="Ваше имя"
                label="Ваше имя"
                shouldFocus
            />

            <TextField
                registration={register('telephone')}
                type="tel"
                error={errors.telephone?.message}
                placeholder="+7 (999) 999 99 99"
                label="Телефон"
            />

            <PasswordField
                label="Пароль"
                error={errors.password?.message}
                registration={register('password')}
            />

            <PasswordField
                label="Повторите пароль"
                error={errors.confirmPassword?.message}
                registration={register('confirmPassword')}
            />

            <CheckboxField
                {...register('policy')}
                isChecked={watch('policy')}
                error={errors.policy?.message}
            >
                Я согласен на обработку моих персональных данных в соответствии
                с Политикой конфиденциальности
            </CheckboxField>

            <CheckboxField
                {...register('agreement')}
                isChecked={watch('agreement')}
                error={errors.agreement?.message}
            >
                Я принимаю условия Пользовательского соглашения
            </CheckboxField>

            <PrimaryBtn type="submit" className="w-full">
                Зарегистрироваться
            </PrimaryBtn>

            <Button
                onClick={onClick}
                className="underline underline-offset-3 text-center cursor-pointer w-full"
            >
                Уже зарегистрированы? Войти
            </Button>
        </form>
    );
}
