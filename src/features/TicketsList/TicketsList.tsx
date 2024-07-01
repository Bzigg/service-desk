import React, { FC, HTMLAttributeAnchorTarget } from 'react'
import { TicketItem } from 'entities/Ticket'

interface IProps {
	className?: string,
	tickets: any[],
	target?: HTMLAttributeAnchorTarget;
}

const TicketsList: FC<IProps> = ({ className, tickets, target }) => {
	return (
		<div className={className}>
			{tickets?.map((ticketItem) => {
				return <TicketItem
					key={ticketItem.id}
					ticket={ticketItem}
					target={target}
				/>
			})}
		</div>
	)
}

export default TicketsList
