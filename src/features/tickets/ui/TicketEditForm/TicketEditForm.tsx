import React, { FC, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import cls from 'pages/TicketEditPage/ui/TicketEditPage/TicketEditPage.module.scss'
import { Input } from 'shared/ui/Input/Input'

interface IProps {
	id: string;
}

export const TicketEditForm: FC<IProps> = ({ id }) => {
	const { control, handleSubmit } = useForm()

	const onSubmit = useCallback((values: any) => {
		console.log(values)
	}, [])

	return (
		<form className={cls.Form} onSubmit={handleSubmit(onSubmit)}>
			<Input
				label="Заголовок"
				rules={{
					required: 'Введите заголовок'
				}}
				control={control}
				name="title"
				type="text"
				placeholder="Введите заголовок"
			/>
			<Input
				label="Описание"
				rules={{
					required: 'Введите описание'
				}}
				control={control}
				name="description"
				type="text"
				placeholder="Введите описание"
			/>
			<Input
				label="Здание"
				rules={{
					required: 'Введите номер здания'
				}}
				control={control}
				name="building"
				type="text"
				placeholder="Введите номер здания"
			/>
			<Input
				label="Кабинет"
				rules={{
					required: 'Введите номер кабинета'
				}}
				control={control}
				name="cabinet"
				type="text"
				placeholder="Введите номер кабинета"
			/>
			<Input
				label="Телефон"
				rules={{
					required: 'Введите телефон'
				}}
				control={control}
				name="phone"
				type="text"
				placeholder="Введите телефон"
			/>
		</form>
	)
}