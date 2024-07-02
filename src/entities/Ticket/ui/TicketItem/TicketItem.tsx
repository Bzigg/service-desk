import React, { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { AssignButton } from 'widgets/AssignButton'
import cls from './TicketItem.module.scss'

interface IProps {
	ticket: any,
}

export const TicketItem: FC<IProps> = ({ ticket }) => {
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
				<AssignButton className="mr8" responsibleId={ticket.responsibleId} />
				<Button onClick={open} theme={ButtonTheme.CLEAR}>
					Открыть
				</Button>
			</div>
		</div>
	)
}
