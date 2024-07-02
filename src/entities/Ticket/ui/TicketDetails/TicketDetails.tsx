import React, { FC } from 'react'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'
import { ticketsApi } from 'features/tickets/api/ticketsApi'
import cls from './TicketDetails.module.scss';

interface IProps {
	id: string;
}

export const TicketDetails: FC<IProps> = ({ id }) => {
	const userData = useSelector(getUserAuthData);

	const { data } = ticketsApi.useGetTicketQuery(id as string)

	return (
		<div className={cls.TicketDetailsWrapper}>
			<div>
				<div className={cls.header}>
					<div>{data?.title}</div>
					<div>{data?.status}</div>
				</div>
				<div>{data?.description}</div>
			</div>
			{data?.customerId === userData?.id &&
				<div className={cls.buttons}>
					<AppLink to={`${RoutePath.my_tickets}/${id}/edit`}>
						<Button theme={ButtonTheme.OUTLINE}>
							Редактировать
						</Button>
					</AppLink>
				</div>
			}
		</div>
	)
}
