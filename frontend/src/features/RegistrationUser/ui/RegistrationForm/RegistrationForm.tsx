import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Listbox } from '@headlessui/react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { UserRole } from 'entities/User'
import cls from './RegistrationForm.module.scss';
import { registrationApi } from 'features/RegistrationUser/model/api/registrationApi'

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
	const {
		control,
		handleSubmit,
		formState: { errors },
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
				onSuccess()
			})
	}, [onSuccess, registration])

	return (
		<form
			className={cls.RegistrationForm}
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className={cls.title}>Регистрация</h1>

			<Controller
				control={control}
				name="lastName"
				render={({ field }) => (
					<div className={cls.fieldBlock}>
						<input
							{...field}
							className={cls.input}
							placeholder="Фамилия"
						/>
						<div className={cls.errorText}>&nbsp;</div>
					</div>
				)}
			/>

			<div className={cls.row}>
				<Controller
					control={control}
					name="firstName"
					rules={{
						required: 'Заполните обязательное поле'
					}}
					render={({ field }) => (
						<div className={cls.fieldBlock}>
							<input
								{...field}
								className={`${cls.input} ${errors.firstName ? cls.inputError : ''}`}
								placeholder="Имя"
							/>
							<div className={cls.errorText}>{errors.firstName?.message || '\u00A0'}</div>
						</div>
					)}
				/>
				<Controller
					control={control}
					name="surname"
					render={({ field }) => (
						<div className={cls.fieldBlock}>
							<input
								{...field}
								className={cls.input}
								placeholder="Отчество"
							/>
							<div className={cls.errorText}>&nbsp;</div>
						</div>
					)}
				/>
			</div>

			<Controller
				control={control}
				name="role"
				render={({ field }) => (
					<div className={cls.fieldBlock}>
						<Listbox value={field.value} onChange={field.onChange}>
							<div className={cls.selector}>
								<Listbox.Button className={cls.selectorButton}>
									<span>{ROLES.find((role) => role.value === field.value)?.content}</span>
									<span className={cls.selectorArrow}>⌃</span>
								</Listbox.Button>
								<Listbox.Options className={cls.selectorMenu}>
									{ROLES.map((role) => (
										<Listbox.Option key={role.value} value={role.value} className={cls.selectorOption}>
											{({ selected }) => (
												<>
													<span className={cls.optionCheck}>{selected ? '✓' : ''}</span>
													<span>{role.content}</span>
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</div>
						</Listbox>
						<div className={cls.errorText}>&nbsp;</div>
					</div>
				)}
			/>

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
					<div className={cls.fieldBlock}>
						<input
							{...field}
							className={`${cls.input} ${errors.email ? cls.inputError : ''}`}
							placeholder="username@gmail.com"
						/>
						<div className={cls.errorText}>{errors.email?.message || '\u00A0'}</div>
					</div>
				)}
			/>

			<Controller
				control={control}
				name="password"
				rules={{
					required: 'Заполните обязательное поле'
				}}
				render={({ field }) => (
					<div className={cls.fieldBlock}>
						<input
							{...field}
							type="password"
							className={`${cls.input} ${errors.password ? cls.inputError : ''}`}
							placeholder="Пароль"
						/>
						<div className={cls.errorText}>{errors.password?.message || '\u00A0'}</div>
					</div>
				)}
			/>

			<Button
				className={cls.submitBtn}
				theme={ButtonTheme.BACKGROUND}
				type="submit"
			>
				Далее
			</Button>
		</form>
	);
};

export default RegistrationForm;
