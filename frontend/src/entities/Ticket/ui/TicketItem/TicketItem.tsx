import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildingsApi } from 'entities/Building';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Tag } from 'shared/ui/Tag/Tag';
import cls from './TicketItem.module.scss';
import MessageIcon from 'shared/assets/icons/message-24-24.svg';

interface IProps {
    ticket: any;
}

export const TicketItem: FC<IProps> = ({ ticket }) => {
    const navigate = useNavigate();

    const buildingId = ticket?.buildingId;
    const { data: building } = buildingsApi.useGetBuildingQuery(
        String(buildingId),
        {
            skip: !buildingId,
        },
    );

    const open = useCallback(() => {
        navigate(`${RoutePath.ticket_details}${ticket.id}`);
    }, [navigate, ticket?.id]);

    const buildingLabel = building
        ? `Ул. ${building.street}, д. ${building.building} (${building.name}). Кабинет ${ticket.cabinet}`
        : null;

    return (
        <div className={cls.Ticket}>
            <div className={cls.iconWrapper}>
                <MessageIcon />
            </div>
            <div className={cls.Content}>
                <div className={cls.Info}>
                    <div className={cls.HeaderInfo}>
                        <div className={cls.HeaderTitle}>Сломался принтер</div>
                        <Tag />
                    </div>
                    {buildingLabel && <div>{buildingLabel}</div>}
                    <div>Принтер не печатает</div>
                </div>
                <Button onClick={open} theme={ButtonTheme.CLEAR}>
                    Перейти
                </Button>
            </div>
        </div>
    );
};
