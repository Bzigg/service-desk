import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { Select } from 'shared/ui/Select/Select';
import { UserRole } from 'entities/User'
import cls from './RegistrationForm.module.scss';

export interface RegistrationFormProps {
	onSuccess: () => void;
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
	const { control, handleSubmit} = useForm()

	const onSubmit = useCallback((values: any) => {
		console.log(values)
	}, [])

	return (
		<form
			className={cls.RegistrationForm}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				label="Ваше имя"
				rules={{
					required: 'Введите ваше имя'
				}}
				control={control}
				name="fName"
				type="text"
				className="mt8"
				placeholder="Введите имя"
			/>
			<Input
				label="Ваша фамилия"
				control={control}
				name="lName"
				type="text"
				className="mt8"
				placeholder="Введите фамилию"
			/>
			<Input
				label="Ваше отчество"
				control={control}
				name="mName"
				type="text"
				className="mt8"
				placeholder="Введите отчество"
			/>
			<Input
				label="Ваш email"
				control={control}
				name="email"
				type="text"
				className="mt8"
				placeholder="Введите email"
			/>
			<Input
				label="Ваш пароль"
				control={control}
				name="password"
				type="text"
				className="mt8"
				placeholder="Введите пароль"
			/>
			<Select
				className="mt8"
				control={control}
				name="role"
				options={ROLES}
				label="Выберете роль"
			/>
			<Button
				className="mt8"
				type="submit"
			>
				Зарегистрироваться
			</Button>
		</form>
	);
};

export default RegistrationForm;
