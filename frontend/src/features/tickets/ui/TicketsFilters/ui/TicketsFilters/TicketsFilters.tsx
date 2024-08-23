import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Select } from 'shared/ui/Select/Select'
import { Button } from 'shared/ui/Button/Button'
import { STATUS_OPTIONS_FILTER, statusEnum } from 'features/tickets/ui/TicketsFilters/model/consts/consts'
import cls from './TicketsFilters.module.scss'

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
		<form className={cls.TicketsFiltersWrapper} onSubmit={handleSubmit(setFilters)}>
			<div className={cls.Filters}>
				<Select
					className="mt8 w180p"
					control={control}
					name="status"
					options={STATUS_OPTIONS_FILTER}
					label="Статус заявки"
				/>
			</div>
			<Button type="submit">
				Применить
			</Button>
		</form>
	);
};
