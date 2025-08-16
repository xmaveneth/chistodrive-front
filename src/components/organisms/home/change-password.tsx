import PrimaryBtn from '@/components/atoms/primary-btn';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { changePassword, ChangePasswordInput } from '@/services/api/auth';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import notify from '@/lib/utils/notify';
import TextField from '@/components/forms/text-field';
import PasswordField from '@/components/forms/password-field';

const formSchema = z
    .object({
        emailCode: z.string().min(1, 'Введите код из email'),
        oldPassword: z.string().min(1, 'Введите текущий пароль'),
        newPassword: z
            .string()
            .min(8, 'Пароль должен содержать не менее 8 символов')
            .regex(
                /[a-z]/,
                'Пароль должен содержать хотя бы одну строчную букву (a-z)'
            )
            .regex(
                /[A-Z]/,
                'Пароль должен содержать хотя бы одну заглавную букву (A-Z)'
            )
            .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру (0-9)')
            .regex(
                /[^a-zA-Z0-9]/,
                'Пароль должен содержать хотя бы один спецсимвол'
            ),
        confirmNewPassword: z.string().min(1, 'Повторите пароль'),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export type FormInputs = z.infer<typeof formSchema>;

export default function ChangePassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormInputs>({
        resolver: zodResolver(formSchema),
    });

    const submitRequest = useMutation({
        mutationFn: ({
            current_password,
            new_password,
            new_password_2,
            code,
        }: ChangePasswordInput) =>
            changePassword({
                current_password,
                new_password,
                new_password_2,
                code,
            }),
        onSuccess: () => {
            setTimeout(() => {
                notify('Пароль успешно изменен!');
            }, 500);
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.ru_message;
                setError('emailCode', {
                    message:
                        typeof detail === 'string'
                            ? detail
                            : 'Ошибка валидации данных. Попробуйте позже.',
                });
            } else {
                setError('emailCode', {
                    message: 'Ошибка валидации данных. Попробуйте позже.',
                });
            }
        },
    });

    const onSubmit = (data: FormInputs) => {
        submitRequest.mutate({
            code: data.emailCode,
            current_password: data.oldPassword,
            new_password: data.newPassword,
            new_password_2: data.confirmNewPassword,
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-sm mt-3"
        >
            <TextField
                registration={register('emailCode')}
                type="text"
                error={errors.emailCode?.message}
                placeholder="Введите код из email"
                label="Введите код из email"
                shouldFocus
            />

            <PasswordField
                label="Старый пароль"
                error={errors.oldPassword?.message}
                registration={register('oldPassword')}
            />

            <PasswordField
                label="Новый пароль"
                error={errors.newPassword?.message}
                registration={register('newPassword')}
            />

            <PasswordField
                label="Повторите новый пароль"
                error={errors.confirmNewPassword?.message}
                registration={register('confirmNewPassword')}
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
