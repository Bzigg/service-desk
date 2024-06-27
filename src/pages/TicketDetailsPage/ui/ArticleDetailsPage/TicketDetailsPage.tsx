import React, { FC, memo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from 'widgets/Page/Page';
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { ticketsApi } from 'features/tickets/api/ticketsApi'
import { useSelector } from 'react-redux'
import { isUserSelector } from 'entities/User'
import { AppLink } from 'shared/ui/AppLink/AppLink'

interface TicketDetailsPageProps {
    className?: string;
}


const TicketDetailsPage: FC<TicketDetailsPageProps> = ({ className }) => {
    const { id } = useParams<{ id: string }>();

    const isUser = useSelector(isUserSelector);

    const { data } = ticketsApi.useGetTicketQuery(id as string)

    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(RoutePath.all_tickets);
    }, [navigate]);

    const onEditTicket = useCallback(() => {
        navigate(`${RoutePath.ticket_edit}${id}/edit`);
    }, [id, navigate]);

    return (
        <Page>
            <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                Назад к списку заявок
            </Button>
            <div>{data?.title}</div>
            <div>{data?.description}</div>
            {isUser &&
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

