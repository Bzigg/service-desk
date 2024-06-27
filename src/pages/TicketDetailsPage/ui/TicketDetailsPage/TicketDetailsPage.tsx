import React, { FC, memo, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Page } from 'widgets/Page/Page';
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { ticketsApi } from 'features/tickets/api/ticketsApi'
import { useSelector } from 'react-redux'
import { getUserAuthData, isUserSelector } from 'entities/User'
import { AppLink } from 'shared/ui/AppLink/AppLink'

interface TicketDetailsPageProps {
    className?: string;
}


const TicketDetailsPage: FC<TicketDetailsPageProps> = ({ className }) => {
    const { id } = useParams();

    const userData = useSelector(getUserAuthData);

    const { data } = ticketsApi.useGetTicketQuery(id as string)

    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(RoutePath.my_tickets);
    }, [navigate]);

    return (
        <Page>
            <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                К списку моих заявок
            </Button>
            <div>{data?.title}</div>
            <div>{data?.description}</div>
            {data?.customerId === userData?.id &&
                <AppLink to={`${RoutePath.my_tickets}/${id}/edit`}>
                    <Button theme={ButtonTheme.OUTLINE}>
                        Редактировать
                    </Button>
                </AppLink>
            }
        </Page>
    )
}

export default memo(TicketDetailsPage)

