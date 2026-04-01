import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildingsApi } from 'entities/Building';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import MessageIcon from 'shared/assets/icons/message-24-24.svg';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Tag } from 'shared/ui/Tag/Tag';
import ClockIcon from 'shared/assets/icons/clock-20-20.svg';
import BuildingIcon from 'shared/assets/icons/building-20-20.svg';

import cls from './TicketItem.module.scss';
import { Status } from '../Status/Status';
import { dateHelpers } from 'shared/lib/helpers/dateHelpers/dateHelpers';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';

interface IProps {
    ticket: any;
}

export const TicketItem: FC<IProps> = ({ ticket }) => {
    const navigate = useNavigate();

    const userData = useSelector(getUserAuthData);

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
                        <Text title={ticket.title} />
                        <Status status={ticket.status} />
                        {[ticket.customerId, ticket.responsibleId].includes(
                            userData?.id,
                        ) && <Tag type="success" title={'моя заявка'} />}
                    </div>
                    <div className={cls.HeaderAdditionalBlock}>
                        <div className={cls.HeaderAdditional}>
                            <ClockIcon />
                            <Text
                                theme={TextTheme.TERTIARY}
                                text={dateHelpers.getDate(ticket.updatedAt)}
                            />
                        </div>

                        {buildingLabel && (
                            <div className={cls.HeaderAdditional}>
                                <BuildingIcon />
                                <Text
                                    theme={TextTheme.TERTIARY}
                                    text={buildingLabel}
                                />
                            </div>
                        )}
                    </div>
                    <Text text={ticket.description} />
                </div>
                <Button onClick={open} theme={ButtonTheme.CLEAR}>
                    Перейти
                </Button>
            </div>
        </div>
    );
};
