import React, { FC, HTMLAttributeAnchorTarget } from 'react'
import { TicketItem } from 'entities/Ticket'

interface IProps {
	tickets: any[],
	target?: HTMLAttributeAnchorTarget;
}

const TicketsList: FC<IProps> = ({ tickets, target }) => {
	return (
		<div>
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
