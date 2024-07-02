import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { getUserAuthData } from 'entities/User'
import { ticketsApi } from 'features/tickets/model/api/ticketsApi'
import { AssignButton } from 'widgets/AssignButton'
import cls from './TicketDetails.module.scss'

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
			<div className={cls.buttons}>
				{data && <AssignButton className="mr8" id={data.id} responsibleId={data.responsibleId} />}
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
