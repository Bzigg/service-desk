import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { getUserAuthData } from 'entities/User';
import { buildingsApi } from 'entities/Building';
import cls from './TicketDetails.module.scss';
import MessageIcon from 'shared/assets/icons/message-24-24.svg';
import { Text } from 'shared/ui/Text/Text';
import { Tag } from 'shared/ui/Tag/Tag';
import PhoneIcon from 'shared/assets/icons/phone-24-24.svg';
import LocationIcon from 'shared/assets/icons/location-20-20.svg';
import BuildingIcon from 'shared/assets/icons/building-20-20.svg';

import { ticketsApi } from '../../model/api/ticketsApi';
import { AssignButton } from '../../ui/AssignButton/AssignButton';

interface IProps {
    id: string;
}

export const TicketDetails: FC<IProps> = ({ id }) => {
    const userData = useSelector(getUserAuthData);

    const { data } = ticketsApi.useGetTicketQuery(id as string);

    const { data: building } = buildingsApi.useGetBuildingQuery(
        data?.buildingId,
        {
            skip: !data?.buildingId,
        },
    );

    return (
        <div className={cls.TicketDetailsWrapper}>
            <div className={cls.iconWrapper}>
                <MessageIcon />
            </div>
            <div className={cls.header}>
                <div>
                    <div className={cls.title}>
                        <Text title={data?.title} />
                        <Tag />
                        <Tag />
                    </div>
                    <Text text={data?.createdAt} />
                </div>
                {data?.customerId === userData?.id && (
                    <Button theme={ButtonTheme.OUTLINE}>Редактировать</Button>
                )}
                <AssignButton
                    className="mr8"
                    id={data?.id}
                    responsibleId={data?.responsibleId}
                />
            </div>
            <div className={cls.info}>
                <div className={cls.infoItem}>
                    <PhoneIcon />
                    <Text text={data?.phone} />
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
            <div className={cls.description}>
                <Text text="Описание:" />
                <Text text={data?.description} />
            </div>
        </div>
    );
};
