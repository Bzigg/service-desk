import React, { FC, useCallback } from 'react'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import cls from './TicketItem.module.scss';
import { useSelector } from 'react-redux'
import { isAdminSelector } from 'entities/User'
import { useNavigate } from 'react-router-dom'

interface IProps {
	ticket: any,
}

export const TicketItem: FC<IProps> = ({ ticket }) => {
	const isAdmin = useSelector(isAdminSelector)
	const navigate = useNavigate()

	const open = useCallback(() => {
		navigate(`${RoutePath.ticket_details}${ticket.id}`)
	}, [ticket?.id])

	return (
		<div className={cls.Ticket}>
			<div>{ticket.title}</div>
			<div>{ticket.description}</div>
			<div>{ticket.status}</div>
			<div className={cls.buttons}>
				{isAdmin && !ticket.responsibleId &&
					<Button className="mr8" theme={ButtonTheme.OUTLINE}>
						Назначить мне
					</Button>
				}
				<Button onClick={open} theme={ButtonTheme.CLEAR}>
					Открыть
				</Button>
			</div>
		</div>
	)
}
