import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useSelector } from 'react-redux'
import { memo, useCallback, useState } from 'react'
import { Text } from 'shared/ui/Text/Text'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import cls from './LoginForm.module.scss'

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
    onRegistrationClick?: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess, onRegistrationClick }: LoginFormProps) => {
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showAuthError, setShowAuthError] = useState(false);

    const onChangeUsername = useCallback((value: string) => {
        if (usernameError) {
            setUsernameError('');
        }
        setShowAuthError(false);
        dispatch(loginActions.setUsername(value));
    }, [dispatch, usernameError]);

    const onChangePassword = useCallback((value: string) => {
        if (passwordError) {
            setPasswordError('');
        }
        setShowAuthError(false);
        dispatch(loginActions.setPassword(value));
    }, [dispatch, passwordError]);

    const onLoginClick = useCallback(async () => {
        const normalizedUsername = username.trim();
        const normalizedPassword = password.trim();
        const emailRegex = /\S+@\S+\.\S+/;

        let hasError = false;

        if (!normalizedUsername) {
            setUsernameError('Заполните обязательное поле');
            hasError = true;
        } else if (!emailRegex.test(normalizedUsername)) {
            setUsernameError('Введите корректный email');
            hasError = true;
        }

        if (!normalizedPassword) {
            setPasswordError('Заполните обязательное поле');
            hasError = true;
        }

        if (hasError) {
            setShowAuthError(false);
            return;
        }

        // Todo переделать на rtkq
        const result = await dispatch(loginByUsername({ email: username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            return;
        }
        setShowAuthError(true);
    }, [onSuccess, dispatch, password, username]);

    const passwordErrorText = passwordError || (showAuthError && error ? 'Неверный email или пароль' : '');

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title="Введите ваш Email и пароль" className={cls.title} />
                <Input
                    autofocus
                    type="text"
                    className={classNames(cls.input, { [cls.inputError]: Boolean(usernameError) })}
                    placeholder="username@gmail.com"
                    onChange={onChangeUsername}
                    value={username}
                />
                <div className={cls.errorText}>{usernameError || '\u00A0'}</div>
                <Input
                    type="password"
                    className={classNames(cls.input, { [cls.inputError]: Boolean(passwordErrorText) })}
                    placeholder="Пароль"
                    onChange={onChangePassword}
                    value={password}
                />
                <div className={cls.errorText}>{passwordErrorText || '\u00A0'}</div>
                <Button
                    theme={ButtonTheme.BACKGROUND}
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    Далее
                </Button>
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={cls.registrationBtn}
                    onClick={onRegistrationClick}
                >
                    Регистрация
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
