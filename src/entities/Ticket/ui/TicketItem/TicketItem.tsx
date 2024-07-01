import React, { FC, HTMLAttributeAnchorTarget } from 'react'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import cls from './TicketItem.module.scss';

interface IProps {
	ticket: any,
	target?: HTMLAttributeAnchorTarget;
}

export const TicketItem: FC<IProps> = ({ ticket, target }) => {
	return (
		<div className={cls.Ticket}>
			<div>{ticket.title}</div>
			<div>{ticket.description}</div>
			<div>{ticket.status}</div>
			<AppLink
				target={target}
				to={`${RoutePath.ticket_details}${ticket.id}`}
				// to={RoutePath.tickets_all_details + ticketItem.id}
			>
				<Button theme={ButtonTheme.OUTLINE}>
					Открыть
				</Button>
			</AppLink>
		</div>
	)
}
