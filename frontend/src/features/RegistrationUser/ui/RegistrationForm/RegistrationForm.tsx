import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { UserRole } from 'entities/User'
import cls from './RegistrationForm.module.scss';
import { registrationApi } from 'features/RegistrationUser'
import { Input } from 'shared/ui/Input/Input'
import { Select } from 'shared/ui/Select/Select'
import { Text } from 'shared/ui/Text/Text'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

export interface RegistrationFormProps {
	onSuccess: () => void;
}

interface RegistrationValues {
	firstName: string;
	lastName: string;
	surname: string;
	email: string;
	password: string;
	role: UserRole;
}

const ROLES = [
	{
		value: UserRole.ADMIN,
		content: 'Системный администратор',
	},
	{
		value: UserRole.USER,
		content: 'Пользователь',
	}
]

const RegistrationForm = ({ onSuccess }: RegistrationFormProps) => {
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
	} = useForm<RegistrationValues>({
		defaultValues: {
			firstName: '',
			lastName: '',
			surname: '',
			email: '',
			password: '',
			role: UserRole.USER
		}
	})

	const [registration] = registrationApi.useRegistrationRequestMutation()

	const onSubmit = useCallback((values: RegistrationValues) => {
		registration(values)
			.unwrap()
			.then(() => {
				onSuccess?.()
			})
	}, [onSuccess, registration])

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
		>
			<Text title="Регистрация"/>

			<Input
				control={control}
				name="lastName"
				label="Фамилия"
				type="text"
				className="mt8"
				placeholder="Иванов"
			/>

			<div className={cls.row}>
				<Input
					control={control}
					name="firstName"
					label="Имя"
					type="text"
					className="mt8"
					placeholder="Иван"
				/>
				<Input
					control={control}
					name="surname"
					label="Отчество"
					type="text"
					className="mt8"
					placeholder="Иванович"
				/>
			</div>

			<Select
				control={control}
				className="mt8"
				name="role"
				options={ROLES}
				label="Роль"
			/>

			<Input
				control={control}
				name="email"
				label="Email"
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
			>
				Зарегистрироваться
			</Button>
			<Button
				theme={ButtonTheme.CLEAR}
				onClick={() => {
					navigate(RoutePath.auth)
				}}
			>
				Вход
			</Button>
			</div>
		</form>
	);
};

export default RegistrationForm;
