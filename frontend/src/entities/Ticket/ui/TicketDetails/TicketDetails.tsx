import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { getUserAuthData } from 'entities/User'
import { ticketsApi } from 'features/tickets/model/api/ticketsApi'
import { buildingsApi } from 'entities/Building/model/buildingsApi'
import { AssignButton } from 'widgets/AssignButton'
import { TicketHeader } from 'widgets/TicketHeader'
import cls from './TicketDetails.module.scss'

interface IProps {
	id: string
}

export const TicketDetails: FC<IProps> = ({ id }) => {
	const userData = useSelector(getUserAuthData);

	const { data } = ticketsApi.useGetTicketQuery(id as string)
	const { data: building } = buildingsApi.useGetBuildingQuery(data?.building, {
		skip: !data?.building
	})

	return (
		<div className={cls.TicketDetailsWrapper}>
			<div>
				<TicketHeader data={data} />
				<div>{data?.description}</div>
				<div>Адрес: {`${building?.name} (${building?.street}, ${building?.building})`}</div>
				<div>Кабинет: {data?.cabinet}</div>
				<div>Телефон: {data?.phone}</div>
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
