import PrimaryBtn from '@/components/atoms/primary-btn';
import PasswordField from '@/components/forms/password-field';
import TextField from '@/components/forms/text-field';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {
    resendEmailCode,
    resendSmsCode,
    signupUser,
    validateSignupCode,
    ValidateSingupCodeType,
} from '@/services/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Button, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import CheckboxField from '@/components/forms/checkbox-field';
import { useAuthContext } from '@/lib/hooks/context/use-auth-context';
import notify from '@/lib/utils/notify';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { useState } from 'react';
import SecondaryBtn from '@/components/atoms/secondary-btn';
import { saveAuthTokens } from '@/lib/utils/save-auth-tokens';
const initialFormSchema = z
    .object({
        name: z
            .string()
            .min(1, 'Данное обязательно к заполнению')
            .max(50, 'Имя не должно превышать 50 символов')
            .regex(
                /^[A-Za-zА-Яа-яЁё\s-]+$/,
                'Имя может содержать только буквы, дефис и пробел'
            ),
        telephone: z
            .string()
            .transform((val) => val.replace(/[\s-]/g, ''))
            .refine(
                (val) => /^(?:\+7|8)\d{10}$/.test(val),
                'Введите корректный номер телефона (например +7 915 123-45-67)'
            ),
        email: z.string().email('Введите правильный email'),
        password: z
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

const finalFormSchema = z.object({
    smsCode: z.string().min(1, 'Введите код из смс'),
    emailCode: z.string().min(1, 'Введите код из email'),
});

export type InitialFormInputs = z.infer<typeof initialFormSchema>;
export type FinalFormInputs = z.infer<typeof finalFormSchema>;

type SignupProps = {
    onClick: () => void;
    setDescription: (val: boolean) => void;
};

export default function Signup({ onClick, setDescription }: SignupProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { toggleSignupDialog } = useAuthContext();
    const [userUUID, setUserUUID] = useState<string | null>(null);

    const {
        register: initialFormRegister,
        handleSubmit: initialFormSubmit,
        formState: { errors: initialFormErrors },
        setError: setInitialFormError,
        watch,
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

    function handleSignupSuccess(finalSignupResponse: {
        access_token: string;
    }) {
        saveAuthTokens(finalSignupResponse);

        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });

        setTimeout(() => {
            navigate('/account');
            notify('Пользователь успешно зарегистрирован!');
            toggleSignupDialog(false);
        }, 500);
    }

    const submitInitialFormRequest = useMutation({
        mutationFn: ({ name, email, telephone, password }: InitialFormInputs) =>
            signupUser({ name, email, telephone, password }),
        onSuccess: (data) => {
            setUserUUID(data.uuid);
            setDescription(true);
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail.ru_message;
                setInitialFormError('telephone', {
                    message:
                        typeof detail === 'string'
                            ? detail
                            : 'Ошибка регистрации. Попробуйте позже.',
                });
            } else {
                setInitialFormError('telephone', {
                    message: 'Ошибка регистрации. Попробуйте позже.',
                });
            }
        },
    });

    const submitFinalFormRequest = useMutation({
        mutationFn: ({
            sms_code,
            email_code,
            user_uuid,
        }: ValidateSingupCodeType) =>
            validateSignupCode({
                sms_code,
                email_code,
                user_uuid,
            }),
        onSuccess: (data) => {
            handleSignupSuccess(data);
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail.ru_message;
                setFinalFormError('smsCode', {
                    message:
                        typeof detail === 'string'
                            ? detail
                            : 'Ошибка валидации кода. Попробуйте позже.',
                });
            } else {
                setFinalFormError('smsCode', {
                    message: 'Ошибка валидации кода. Попробуйте позже.',
                });
            }
        },
    });

    const submitResendEmailCodeRequest = useMutation({
        mutationFn: ({ user_uuid }: { user_uuid: string }) =>
            resendEmailCode({ user_uuid }),
        onSuccess: (data) => {
            notify(data.ru_message);
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail?.ru_message;
                setFinalFormError('emailCode', {
                    message:
                        typeof detail === 'string'
                            ? detail
                            : 'Ошибка регистрации. Попробуйте позже.',
                });
            } else {
                setFinalFormError('emailCode', {
                    message: 'Ошибка регистрации. Попробуйте позже.',
                });
            }
        },
    });

    const submitResendSmsCodeRequest = useMutation({
        mutationFn: ({ user_uuid }: { user_uuid: string }) =>
            resendSmsCode({ user_uuid }),
        onSuccess: (data) => {
            notify(data.ru_message);
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                const detail = error.response.data?.detail?.ru_message;
                setFinalFormError('smsCode', {
                    message:
                        typeof detail === 'string'
                            ? detail
                            : 'Ошибка регистрации. Попробуйте позже.',
                });
            } else {
                setFinalFormError('smsCode', {
                    message: 'Ошибка регистрации. Попробуйте позже.',
                });
            }
        },
    });

    const onInitialFormSubmit = (data: InitialFormInputs) => {
        submitInitialFormRequest.mutate(data);
    };

    const onValidationSubmit = (data: FinalFormInputs) => {
        if (!userUUID) return;
        submitFinalFormRequest.mutate({
            sms_code: data.smsCode,
            email_code: data.emailCode,
            user_uuid: userUUID,
        });
    };

    const onSubmitResendEmail = () => {
        if (!userUUID) return;
        submitResendEmailCodeRequest.mutate({
            user_uuid: userUUID,
        });
    };

    const onSubmitResendSms = () => {
        if (!userUUID) return;
        submitResendSmsCodeRequest.mutate({
            user_uuid: userUUID,
        });
    };

    return (
        <>
            <Transition show={userUUID != null}>
                <form
                    onSubmit={finalFormSubmit(onValidationSubmit)}
                    className="space-y-4 text-sm mt-3 transition duration-500 ease-in data-open:max-h-100 data-closed:max-h-0 data-closed:opacity-0"
                >
                    <TextField
                        registration={finalFormRegister('smsCode')}
                        type="text"
                        error={finalFormErrors.smsCode?.message}
                        placeholder="Введите код из смс"
                        label="Введите код из смс"
                        shouldFocus
                    />

                    <TextField
                        registration={finalFormRegister('emailCode')}
                        type="text"
                        error={finalFormErrors.emailCode?.message}
                        placeholder="Введите код из email"
                        label="Введите код из email"
                    />

                    <div className="flex items-center justify-center mt-4 gap-2">
                        <SecondaryBtn
                            onClick={onSubmitResendSms}
                            type="button"
                            className="text-xs rounded-sm mx-auto"
                        >
                            Повторно отправить смс
                        </SecondaryBtn>
                        <SecondaryBtn
                            onClick={onSubmitResendEmail}
                            type="button"
                            className="text-xs rounded-sm mx-auto"
                        >
                            Повторно отправить email
                        </SecondaryBtn>
                    </div>

                    <PrimaryBtn
                        type="submit"
                        className="w-full"
                    >
                        Зарегистрироваться
                    </PrimaryBtn>
                </form>
            </Transition>
            <Transition show={userUUID == null}>
                <form
                    onSubmit={initialFormSubmit(onInitialFormSubmit)}
                    className="space-y-4 text-sm mt-3 transition duration-500 ease-in data-closed:opacity-0 data-open:max-h-100 data-closed:max-h-0"
                >
                    <TextField
                        registration={initialFormRegister('name')}
                        type="text"
                        error={initialFormErrors.name?.message}
                        placeholder="Ваше имя"
                        label="Ваше имя"
                        shouldFocus
                    />

                    <TextField
                        registration={initialFormRegister('email')}
                        type="email"
                        error={initialFormErrors.email?.message}
                        placeholder="Ваш emai"
                        label="Ваш email"
                    />

                    <TextField
                        registration={initialFormRegister('telephone')}
                        type="tel"
                        error={initialFormErrors.telephone?.message}
                        placeholder="+7 (999) 999 99 99"
                        label="Телефон"
                    />

                    <PasswordField
                        label="Пароль"
                        error={initialFormErrors.password?.message}
                        registration={initialFormRegister('password')}
                    />

                    <PasswordField
                        label="Повторите пароль"
                        error={initialFormErrors.confirmPassword?.message}
                        registration={initialFormRegister('confirmPassword')}
                    />

                    <CheckboxField
                        {...initialFormRegister('policy')}
                        isChecked={watch('policy')}
                        error={initialFormErrors.policy?.message}
                    >
                        Я согласен на обработку моих персональных данных в
                        соответствии с
                        <Link
                            className="inline underline underline-offset-3 text-center cursor-pointer transition hover:text-white"
                            to="/policy"
                            onClick={() => toggleSignupDialog(false)}
                        >
                            {' '}
                            Политикой конфиденциальности
                        </Link>
                    </CheckboxField>

                    <CheckboxField
                        {...initialFormRegister('agreement')}
                        isChecked={watch('agreement')}
                        error={initialFormErrors.agreement?.message}
                    >
                        Я принимаю условия
                        <Link
                            className="inline underline underline-offset-3 text-center cursor-pointer transition hover:text-white"
                            to="/rules"
                            onClick={() => toggleSignupDialog(false)}
                        >
                            {' '}
                            Пользовательского соглашения
                        </Link>
                    </CheckboxField>

                    <PrimaryBtn
                        type="submit"
                        className="w-full"
                    >
                        Продолжить
                    </PrimaryBtn>

                    <Button
                        onClick={onClick}
                        className="underline underline-offset-3 text-center cursor-pointer w-full transition hover:text-white"
                    >
                        Уже зарегистрированы? Войти
                    </Button>
                </form>
            </Transition>
        </>
    );
}
