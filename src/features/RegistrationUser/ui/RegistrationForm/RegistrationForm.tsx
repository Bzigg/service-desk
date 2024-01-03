import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form'
import cls from 'features/AuthByUsername/ui/LoginForm/LoginForm.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { Button } from 'shared/ui/Button/Button'
import { Select } from 'shared/ui/Select/Select'

export interface RegistrationFormProps {
	onSuccess: () => void;
	className?: string;
}

const ROLES = [
	{
		value: 'admin',
		content: 'Системный администратор',
	},
	{
		value: 'user',
		content: 'Пользователь',
	}
]

const RegistrationForm = ({ className }: RegistrationFormProps) => {
	const { control, handleSubmit} = useForm()

	const onSubmit = useCallback((values: any) => {
		console.log(values)
	}, [])

	const onChange = useCallback((values: any) => {
		console.log(values)
	}, [])

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={className}>
			<Input
				control={control}
				name="fName"
				type="text"
				className={cls.input}
				placeholder="Введите имя"
			/>
			<Input
				control={control}
				name="lName"
				type="text"
				className={cls.input}
				placeholder="Введите фамилию"
			/>
			<Input
				control={control}
				name="mName"
				type="text"
				className={cls.input}
				placeholder="Введите отчество"
			/>
			<Input
				control={control}
				name="email"
				type="text"
				className={cls.input}
				placeholder="Введите email"
			/>
			<Input
				control={control}
				name="password"
				type="text"
				className={cls.input}
				placeholder="Введите пароль"
			/>
			<Select
				options={ROLES}
				label="Выберете роль"
				value={ROLES[0].value}
				onChange={onChange}
			/>
			<Button
				type="submit"
			>
				Зарегистрироваться
			</Button>
		</form>
	);
};

export default RegistrationForm;
