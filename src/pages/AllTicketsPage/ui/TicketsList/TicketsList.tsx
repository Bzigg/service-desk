import React, { FC } from 'react';

interface IProps {
	tickets: any[]
}

const TicketsList: FC<IProps> = ({ tickets }) => {
	return (
		<div>
			{tickets?.map((ticketItem) => {
				return <div key={ticketItem.index}>
					{ticketItem.title}
				</div>
			})}
		</div>
	);
};

export default TicketsList;