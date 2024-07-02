import React, { FC } from 'react'
import { TicketItem } from 'entities/Ticket'

interface IProps {
	tickets: any[],
}

const TicketsList: FC<IProps> = ({ tickets }) => {
	return (
		<div className="mt8">
			{tickets?.map((ticketItem) => {
				return <TicketItem
					key={ticketItem.id}
					ticket={ticketItem}
				/>
			})}
		</div>
	)
}

export default TicketsList
