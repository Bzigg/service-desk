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
					{ticketItem.title}
					<AppLink
						target={target}
						to={`${RoutePath.tickets_all_details}${ticketItem.id}`}
						// to={RoutePath.tickets_all_details + ticketItem.id}
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