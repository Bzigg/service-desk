import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useSelector } from 'react-redux'
import { memo, useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text } from 'shared/ui/Text/Text'
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
		formState: { errors },
		clearErrors,
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
				<Text title="Введите ваш Email и пароль" className={cls.title}/>
				<Controller
					control={control}
					name="email"
					rules={{
						required: 'Заполните обязательное поле',
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'Введите корректный email',
						},
					}}
					render={({ field }) => (
						<>
							<Input
								autofocus
								type="text"
								className={classNames(cls.input, { [cls.inputError]: Boolean(errors.email?.message) })}
								placeholder="username@gmail.com"
								value={field.value}
								onChange={(value) => {
									if (errors.password?.type === 'manual') {
										clearErrors('password');
									}
									field.onChange(value);
								}}
							/>
							<div className={cls.errorText}>{errors.email?.message || '\u00A0'}</div>
						</>
					)}
				/>
				<Controller
					control={control}
					name="password"
					rules={{
						required: 'Заполните обязательное поле',
					}}
					render={({ field }) => (
						<>
							<Input
								type="password"
								className={classNames(cls.input, { [cls.inputError]: Boolean(errors.password?.message) })}
								placeholder="Пароль"
								value={field.value}
								onChange={(value) => {
									if (errors.password?.type === 'manual') {
										clearErrors('password');
									}
									field.onChange(value);
								}}
							/>
							<div className={cls.errorText}>{errors.password?.message || '\u00A0'}</div>
						</>
					)}
				/>
				<Button
					theme={ButtonTheme.BACKGROUND}
					className={cls.loginBtn}
					type="submit"
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
			</form>
		</DynamicModuleLoader>
	);
});

export default LoginForm;
