import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { getUserAuthData } from 'entities/User';
import { buildingsApi } from 'entities/Building';
import { useNavigate } from 'react-router-dom';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Tag } from 'shared/ui/Tag/Tag';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MessageIcon from 'shared/assets/icons/message-24-24.svg';
import PhoneIcon from 'shared/assets/icons/phone-24-24.svg';
import LocationIcon from 'shared/assets/icons/location-20-20.svg';
import BuildingIcon from 'shared/assets/icons/building-20-20.svg';

import cls from './TicketDetails.module.scss';
import { ticketsApi } from '../../model/api/ticketsApi';
import { AssignButton } from '../../ui/AssignButton/AssignButton';
import { Status } from '../Status/Status';

interface IProps {
    id: string;
}

export const TicketDetails: FC<IProps> = ({ id }) => {
    const navigate = useNavigate();
    const userData = useSelector(getUserAuthData);

    const { data: ticket } = ticketsApi.useGetTicketQuery(id as string);

    const { data: building } = buildingsApi.useGetBuildingQuery(
        ticket?.buildingId,
        {
            skip: !ticket?.buildingId,
        },
    );

    const onEdit = () => {
        navigate(`${RoutePath.my_tickets}/${id}/edit`);
    };

    return (
        <div className={cls.TicketDetailsWrapper}>
            <div className={cls.header}>
                <div>
                    <div className={cls.title}>
                        <div className={cls.iconWrapper}>
                            <MessageIcon />
                        </div>
                        <Text title={ticket?.title} />
                        {ticket && <Status status={ticket.status} />}
                        <Tag type={'success'} title={'моя заявка'} />
                    </div>
                    <Text theme={TextTheme.TERTIARY} text={ticket?.createdAt} />
                </div>
                {ticket?.customerId === userData?.id && (
                    <Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
                        Редактировать
                    </Button>
                )}
                <AssignButton
                    className="mr8"
                    id={ticket?.id}
                    responsibleId={ticket?.responsibleId}
                />
            </div>
            <div className={cls.info}>
                <div className={cls.infoItem}>
                    <PhoneIcon />
                    <Text text={ticket?.phone} />
                </div>
                <div className={cls.infoItem}>
                    <BuildingIcon />
                    <Text text={building?.name} />
                </div>
                <div className={cls.infoItem}>
                    <LocationIcon />
                    <Text
                        text={`Ул. ${building?.street}, д. ${building?.building}`}
                    />
                </div>
            </div>
            <div>
                <Text theme={TextTheme.SECONDARY} text="Описание:" />
                <Text text={ticket?.description} />
            </div>
            <div className={cls.history}>
                <Text theme={TextTheme.SECONDARY} text="История:" />
                <div className={cls.historyItem}>
                    <div className={cls.historyInfo}>
                        <Text
                            theme={TextTheme.PRIMARY}
                            title="Заявка создана"
                            size={TextSize.M}
                        />
                    </div>
                    <div className={cls.historyDate}>{ticket?.createdAt}</div>
                </div>
            </div>
        </div>
    );
};
