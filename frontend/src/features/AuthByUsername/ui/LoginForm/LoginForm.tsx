import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useLoginMutation } from '../../model/api/loginApi';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
    onRegistrationClick?: () => void;
}

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm = memo(
    ({ className, onSuccess, onRegistrationClick }: LoginFormProps) => {
        const [login, { isLoading, isError }] = useLoginMutation();
        const { control, handleSubmit, setError } = useForm<LoginFormValues>({
            defaultValues: {
                email: '',
                password: '',
            },
        });

        const onSubmit = useCallback(
            async (values: LoginFormValues) => {
                try {
                    await login({
                        email: values.email.trim(),
                        password: values.password.trim(),
                    }).unwrap();
                    onSuccess();
                } catch (e) {
                    console.log(e);
                }
            },
            [login, onSuccess, setError],
        );

        return (
            <form
                className={classNames(cls.LoginForm, {}, [className])}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Text title="Введите ваш Email и пароль" />
                {isError && (
                    <Text
                        text="Вы ввели неверный логин или пароль"
                        theme={TextTheme.ERROR}
                    />
                )}
                <Input
                    control={control}
                    name="email"
                    label="Email"
                    autofocus
                    type="text"
                    className="mt8"
                    placeholder="user@email.ru"
                    rules={{
                        required: 'Укажите Email',
                    }}
                />
                <Input
                    control={control}
                    name="password"
                    label="Пароль"
                    className="mt8"
                    placeholder="Введите пароль"
                    type="password"
                    rules={{
                        required: 'Укажите пароль',
                    }}
                />
                <div className={cls.buttonWrapper}>
                    <Button
                        theme={ButtonTheme.BACKGROUND}
                        type="submit"
                        disabled={isLoading}
                    >
                        Далее
                    </Button>
                    <Button
                        theme={ButtonTheme.CLEAR}
                        onClick={onRegistrationClick}
                    >
                        Регистрация
                    </Button>
                </div>
            </form>
        );
    },
);

export default LoginForm;
