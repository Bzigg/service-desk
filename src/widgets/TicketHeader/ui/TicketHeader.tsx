import React, { FC } from 'react';
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'
import cls from './TicketHeader.module.scss'

interface IProps {
	data: any
}

export const TicketHeader: FC<IProps> = ({ data }) => {
	const userData = useSelector(getUserAuthData)

	return (
		<div className={cls.TicketHeader}>
			<div>{data?.title}</div>
			<div>
				{
					data && data?.responsibleId === userData?.id ?
						`можно редачить ${data?.status}`
						:
						data?.status
				}
			</div>
		</div>
	)
}
