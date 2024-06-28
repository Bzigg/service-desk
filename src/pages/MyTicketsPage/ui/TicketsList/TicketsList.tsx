import React, { FC, HTMLAttributeAnchorTarget } from 'react'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { AppLink } from 'shared/ui/AppLink/AppLink'

interface IProps {
	tickets: any[],
	target?: HTMLAttributeAnchorTarget;
}

const TicketsList: FC<IProps> = ({ tickets, target }) => {
	return (
		<div>
			{tickets?.map((ticketItem) => {
				return <div key={ticketItem.id}>
					<div>{ticketItem.title}</div>
					<div>{ticketItem.description}</div>
					<div>{ticketItem.status}</div>
					<AppLink
						target={target}
						to={`${RoutePath.ticket_details}${ticketItem.id}`}
					>
						<Button theme={ButtonTheme.OUTLINE}>
							Открыть
						</Button>
					</AppLink>
				</div>
			})}
		</div>
	);
};

export default TicketsList;