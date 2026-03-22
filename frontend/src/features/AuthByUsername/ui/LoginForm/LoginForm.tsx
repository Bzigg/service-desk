import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useSelector } from 'react-redux'
import { memo, useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { loginReducer } from '../../model/slice/loginSlice'
import cls from './LoginForm.module.scss'

export interface LoginFormProps {
	className?: string;
	onSuccess: () => void;
	onRegistrationClick?: () => void;
}

const initialReducers: ReducersList = {
	loginForm: loginReducer,
};

interface LoginFormValues {
	email: string;
	password: string;
}

const LoginForm = memo(({ className, onSuccess, onRegistrationClick }: LoginFormProps) => {
	const dispatch = useAppDispatch();
	const isLoading = useSelector(getLoginIsLoading);
	const error = useSelector(getLoginError);
	const {
		control,
		handleSubmit,
		setError,
	} = useForm<LoginFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = useCallback(async (values: LoginFormValues) => {
		// Todo переделать на rtkq
		const result = await dispatch(loginByUsername({
			email: values.email.trim(),
			password: values.password.trim(),
		}));
		if (result.meta.requestStatus === 'fulfilled') {
			onSuccess();
			return;
		}
		if (error) {
			setError('password', {
				type: 'manual',
				message: 'Неверный email или пароль',
			});
		}
	}, [dispatch, error, onSuccess, setError]);

	return (
		<DynamicModuleLoader
			removeAfterUnmount
			reducers={initialReducers}
		>
			<form className={classNames(cls.LoginForm, {}, [className])} onSubmit={handleSubmit(onSubmit)}>
				<Text title="Введите ваш Email и пароль"/>
				{error && <Text text="Вы ввели неверный логин или пароль" theme={TextTheme.ERROR} />}
				<Input
					control={control}
					name="email"
					label="Email"
					autofocus
					type="text"
					className="mt8"
					placeholder="user@email.ru"
				/>
				<Input
					control={control}
					name="password"
					label="Пароль"
					className="mt8"
					placeholder="Введите пароль"
					type="password"
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
		</DynamicModuleLoader>
	);
});

export default LoginForm;
