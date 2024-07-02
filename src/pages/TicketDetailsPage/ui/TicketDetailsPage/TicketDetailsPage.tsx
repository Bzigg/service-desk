import React, { FC, memo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from 'widgets/Page/Page';
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { TicketDetails } from 'entities/Ticket'

interface TicketDetailsPageProps {
    className?: string;
}


const TicketDetailsPage: FC<TicketDetailsPageProps> = ({ className }) => {
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(RoutePath.my_tickets);
    }, [navigate]);

    return (
        <Page>
            <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                К списку моих заявок
            </Button>
            <TicketDetails id={id as string} />
        </Page>
    )
}

export default memo(TicketDetailsPage)

