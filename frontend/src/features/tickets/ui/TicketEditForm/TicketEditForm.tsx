import React, { FC, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from 'shared/ui/Input/Input'
import cls from './TicketEditForm.module.scss'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { ticketsApi } from 'features/tickets/model/api/ticketsApi';
import { Select } from 'shared/ui/Select/Select';
import { buildingsApi } from 'entities/Building/model/buildingsApi';

interface IProps {
	id: string;
}

export const TicketEditForm: FC<IProps> = ({ id }) => {
	const navigate = useNavigate();

	const { data } = ticketsApi.useGetTicketQuery(id, {
		skip: !id
	})

	const { data: buildings } = buildingsApi.useGetBuildingsQuery()

	const { control, handleSubmit } = useForm({
		values: {
			title: data?.title || '',
			description: data?.description || '',
			building: data?.building || buildings?.[1]?.id,
			cabinet: data?.cabinet || '',
			phone: data?.phone || '',
		}
	})

	const cancel = useCallback(() => {
		navigate(`${RoutePath.ticket_details}${id}`)
	}, [])

	const [createTicket] = ticketsApi.useCreateTicketMutation()
	const [changeTicket] = ticketsApi.useChangeTicketMutation()

	const onSubmit = useCallback((values: any) => {
		if (id) {
			changeTicket({
				...values,
				ticketId: id,
			})
			cancel()
			return
		}
		createTicket(values)
			.unwrap()
			.then((response) => {
				navigate(`${RoutePath.ticket_details}${response.id}`)
			})
	}, [id])

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
			<Select
				className="mt8"
				control={control}
				name="building"
				options={buildings}
				label="Выберете строение"
				keyName="id"
				labelName={(option: any) => (`${option?.name} (${option?.street}, ${option?.building})`)}
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
				{Boolean(id) && (
					<Button className="ml8" onClick={cancel} theme={ButtonTheme.CLEAR}>
						Отмена
					</Button>
				)}
			</div>
		</form>
	)
}