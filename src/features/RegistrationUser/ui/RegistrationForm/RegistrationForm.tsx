import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import cls from 'features/AuthByUsername/ui/LoginForm/LoginForm.module.scss';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { Select } from 'shared/ui/Select/Select';
import { classNames } from 'shared/lib/classNames/classNames'
import { UserRole } from 'entities/User'

export interface RegistrationFormProps {
	onSuccess: () => void;
	className?: string;
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

const RegistrationForm = ({ className }: RegistrationFormProps) => {
	const { control, handleSubmit} = useForm()

	const onSubmit = useCallback((values: any) => {
		console.log(values)
	}, [])

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={classNames(`${className}`)}>
			<Input
				label="Ваше имя"
				rules={{
					required: 'Введите ваше имя'
				}}
				control={control}
				name="fName"
				type="text"
				className={cls.input}
				placeholder="Введите имя"
			/>
			<Input
				label="Ваша фамилия"
				control={control}
				name="lName"
				type="text"
				className={cls.input}
				placeholder="Введите фамилию"
			/>
			<Input
				label="Ваше отчество"
				control={control}
				name="mName"
				type="text"
				className={cls.input}
				placeholder="Введите отчество"
			/>
			<Input
				label="Ваш email"
				control={control}
				name="email"
				type="text"
				className={cls.input}
				placeholder="Введите email"
			/>
			<Input
				label="Ваш пароль"
				control={control}
				name="password"
				type="text"
				className={cls.input}
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
