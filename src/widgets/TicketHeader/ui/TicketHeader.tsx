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

interface IProps {
	data: {
		title: string
		responsibleId: string
		status: statusEnum
	}
}

export const TicketHeader: FC<IProps> = ({ data }) => {
	const [status, setStatus] = useState(StatusMapper[data?.status])
	const userData = useSelector(getUserAuthData)

	return (
		<div className={cls.TicketHeader}>
			<div>{data?.title}</div>
			<div>
				{
					data && data?.responsibleId === userData?.id ?
						<Select
							className="mt8 w180p"
							value={status}
							options={STATUS_OPTIONS_TICKET}
							onChange={setStatus}
						/>
						:
						StatusMapper[data?.status]
				}
			</div>
		</div>
	)
}
