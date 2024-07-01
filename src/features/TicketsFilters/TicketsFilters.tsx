import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Select } from 'shared/ui/Select/Select'
import { Button } from 'shared/ui/Button/Button'

interface IProps {
	setFilters: any
}

const statusOptions = [
	{
		value: 'ALL',
		content: 'Все заявки'
	},
	{
		value: 'OPEN',
		content: 'Открытые'
	},
	{
		value: 'IN_PROGRESS',
		content: 'В работе'
	},
	{
		value: 'COMPLETED',
		content: 'Выполненные'
	},
	{
		value: 'REJECTED',
		content: 'Отклоненные'
	}
]

const TicketsFilters: FC<IProps> = ({ setFilters }) => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			status: 'ALL'
		}
	})

	return (
		<form onSubmit={handleSubmit(setFilters)}>
			<Select
				className="mt8 w180p"
				control={control}
				name="status"
				options={statusOptions}
				label="Статус заявки"
			/>
			<Button type="submit">
				Применить
			</Button>
		</form>
	);
};

export default TicketsFilters;