import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Select } from 'shared/ui/Select/Select'
import { Button } from 'shared/ui/Button/Button'
import { STATUS_OPTIONS, statusEnum } from 'features/TicketsFilters/model/consts/consts'

interface IProps {
	setFilters: any
}

export const TicketsFilters: FC<IProps> = ({ setFilters }) => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			status: statusEnum.ALL
		}
	})

	return (
		<form onSubmit={handleSubmit(setFilters)}>
			<Select
				className="mt8 w180p"
				control={control}
				name="status"
				options={STATUS_OPTIONS}
				label="Статус заявки"
			/>
			<Button type="submit">
				Применить
			</Button>
		</form>
	);
};
