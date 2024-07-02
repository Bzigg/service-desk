import React, { FC } from 'react'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import { getUserAuthData, isAdminSelector } from 'entities/User'
import { ticketsApi } from 'features/tickets/model/api/ticketsApi'
import cls from './TicketDetails.module.scss';

interface IProps {
	id: string;
}

export const TicketDetails: FC<IProps> = ({ id }) => {
	const userData = useSelector(getUserAuthData);
	const isAdmin = useSelector(isAdminSelector)

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
			<div className={cls.buttons}>
				{isAdmin && !data?.responsibleId &&
					<Button className="mr8" theme={ButtonTheme.OUTLINE}>
						Назначить мне
					</Button>
				}
				{data?.customerId === userData?.id &&
					<AppLink to={`${RoutePath.my_tickets}/${id}/edit`}>
						<Button theme={ButtonTheme.OUTLINE}>
							Редактировать
						</Button>
					</AppLink>
				}
			</div>
		</div>
	)
}
