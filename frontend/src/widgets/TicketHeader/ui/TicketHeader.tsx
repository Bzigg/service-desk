import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'
import cls from './TicketHeader.module.scss'
import {
	STATUS_OPTIONS_TICKET,
	statusEnum,
	StatusMapper
} from 'features/tickets/ui/TicketsFilters/model/consts/consts'
import { Select } from 'shared/ui/Select/Select'
import { ticketsApi } from 'features/tickets/model/api/ticketsApi'

interface IProps {
	data: {
		title: string
		id: string
		responsibleId: string
		status: statusEnum
	}
}

export const TicketHeader: FC<IProps> = ({ data }) => {
	const userData = useSelector(getUserAuthData)
	const [changeStatus] = ticketsApi.useChangeStatusMutation()

	return (
		<div className={cls.TicketHeader}>
			<div>{data?.title}</div>
			<div>
				{
					data && data?.responsibleId === userData?.id ?
						<Select
							className="mt8 w180p"
							value={data.status}
							options={STATUS_OPTIONS_TICKET}
							onChange={(status) => {
								changeStatus({
									status,
									ticketId: data.id
								})
							}}
						/>
						:
						StatusMapper[data?.status]
				}
			</div>
		</div>
	)
}
