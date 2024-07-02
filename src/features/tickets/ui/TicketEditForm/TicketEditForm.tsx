import React, { FC, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from 'shared/ui/Input/Input'
import cls from './TicketEditForm.module.scss'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useNavigate } from 'react-router-dom'

interface IProps {
	id: string;
}

export const TicketEditForm: FC<IProps> = ({ id }) => {
	const navigate = useNavigate();

	const { control, handleSubmit } = useForm()

	const cancel = useCallback(() => {
		navigate(`${RoutePath.ticket_details}${id}`)
	}, [])

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
			<div className={cls.buttons}>
				<Button type="submit" theme={ButtonTheme.OUTLINE}>
					Сохранить
				</Button>
				<Button className="ml8" onClick={cancel} theme={ButtonTheme.CLEAR}>
					Отмена
				</Button>
			</div>
		</form>
	)
}