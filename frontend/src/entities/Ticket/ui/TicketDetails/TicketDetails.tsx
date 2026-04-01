import React, { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { getUserAuthData } from 'entities/User';
import { buildingsApi } from 'entities/Building';
import { useNavigate } from 'react-router-dom';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Tag } from 'shared/ui/Tag/Tag';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { dateHelpers } from 'shared/lib/helpers/dateHelpers/dateHelpers';
import MessageIcon from 'shared/assets/icons/message-24-24.svg';
import PhoneIcon from 'shared/assets/icons/phone-24-24.svg';
import LocationIcon from 'shared/assets/icons/location-20-20.svg';
import BuildingIcon from 'shared/assets/icons/building-20-20.svg';

import cls from './TicketDetails.module.scss';
import { ticketsApi } from '../../model/api/ticketsApi';
import { AssignButton } from '../../ui/AssignButton/AssignButton';
import { Status } from '../Status/Status';
import { InfoItem } from 'entities/Ticket/ui/TicketDetails/InfoItem';
import { HistoryItem } from 'entities/Ticket/ui/TicketDetails/HistoryItem';
import { useGetUserDataQuery } from 'features/editableProfileCard';
import { useGetPhoto } from 'shared/lib/hooks/useGetPhoto/useGetPhoto';
import { statusEnum } from 'features/tickets/ui/TicketsFilters';
import { RejectTicketModal } from './RejectTicketModal/RejectTicketModal';

interface IProps {
    id: string;
}

export const TicketDetails: FC<IProps> = ({ id }) => {
    const navigate = useNavigate();
    const userData = useSelector(getUserAuthData);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

    const { data: ticket } = ticketsApi.useGetTicketQuery(id as string);
    const [changeStatus, { isLoading: isChangeStatusLoading }] =
        ticketsApi.useChangeStatusMutation();

    const { data: building } = buildingsApi.useGetBuildingQuery(
        ticket?.buildingId,
        {
            skip: !ticket?.buildingId,
        },
    );

    const { data: user } = useGetUserDataQuery(ticket?.customerId as string, {
        skip: !ticket?.customerId,
    });

    const { data: admin } = useGetUserDataQuery(
        ticket?.responsibleId as string,
        {
            skip: !ticket?.responsibleId,
        },
    );

    const userPhoto = useGetPhoto(user?.photo || '');
    const adminPhoto = useGetPhoto(admin?.photo || '');

    const onEdit = () => {
        navigate(`${RoutePath.my_tickets}/${id}/edit`);
    };

    const onTakeToWork = useCallback(async () => {
        if (!ticket) return;
        await changeStatus({
            ticketId: ticket.id,
            status: statusEnum.IN_PROGRESS,
        });
    }, [changeStatus, ticket]);

    const onComplete = useCallback(async () => {
        if (!ticket) return;
        await changeStatus({
            ticketId: ticket.id,
            status: statusEnum.COMPLETED,
        });
    }, [changeStatus, ticket]);

    const onOpenRejectModal = useCallback(() => {
        setIsRejectModalOpen(true);
    }, []);

    const onCloseRejectModal = useCallback(() => {
        setIsRejectModalOpen(false);
    }, []);

    const onReject = useCallback(async () => {
        if (!ticket) return;
        await changeStatus({
            ticketId: ticket.id,
            status: statusEnum.REJECTED,
        });
        setIsRejectModalOpen(false);
    }, [changeStatus, ticket]);

    return (
        <div className={cls.TicketDetailsWrapper}>
            <RejectTicketModal
                isOpen={isRejectModalOpen}
                onClose={onCloseRejectModal}
                onReject={onReject}
                isLoading={isChangeStatusLoading}
                lazy
            />
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
                    <Text
                        theme={TextTheme.TERTIARY}
                        text={dateHelpers.getDateTime(ticket?.createdAt)}
                    />
                </div>
                {ticket?.customerId === userData?.id && (
                    <Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
                        Редактировать
                    </Button>
                )}
                {ticket?.responsibleId === userData?.id && (
                    <div>
                        {ticket?.status === statusEnum.OPEN && (
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onTakeToWork}
                                disabled={isChangeStatusLoading}
                            >
                                В работу
                            </Button>
                        )}
                        {ticket?.status === statusEnum.IN_PROGRESS && (
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onComplete}
                                disabled={isChangeStatusLoading}
                            >
                                Завершить
                            </Button>
                        )}
                        {![statusEnum.COMPLETED, statusEnum.REJECTED].includes(
                            ticket?.status,
                        ) && (
                            <Button
                                theme={ButtonTheme.CLEAR}
                                onClick={onOpenRejectModal}
                                disabled={isChangeStatusLoading}
                            >
                                Отклонить
                            </Button>
                        )}
                    </div>
                )}
                <AssignButton
                    className="mr8"
                    id={ticket?.id}
                    responsibleId={ticket?.responsibleId}
                />
            </div>
            <div className={cls.info}>
                <InfoItem Icon={<PhoneIcon />} text={ticket?.phone} />
                <InfoItem Icon={<BuildingIcon />} text={building?.name} />
                <InfoItem
                    Icon={<LocationIcon />}
                    text={`Ул. ${building?.street}, д. ${building?.building}`}
                />
            </div>
            <div>
                <Text theme={TextTheme.SECONDARY} text="Описание:" />
                <Text text={ticket?.description} />
            </div>
            <div className={cls.history}>
                <Text theme={TextTheme.SECONDARY} text="История:" />
                <HistoryItem
                    title="Заявка создана"
                    description="Создано:"
                    dateTime={ticket?.createdAt}
                    user={{
                        photoSrc: userPhoto,
                        name:
                            `${user?.firstName} ${user?.lastName?.[0]}.` || '',
                    }}
                />
                {admin && (
                    <HistoryItem
                        title="Взяли в работу"
                        description="Исполнитель:"
                        dateTime={ticket?.updatedAt}
                        user={{
                            photoSrc: adminPhoto,
                            name:
                                `${admin?.firstName} ${admin?.lastName?.[0]}.` ||
                                '',
                        }}
                    />
                )}
                {[statusEnum.COMPLETED, statusEnum.REJECTED].includes(
                    ticket?.status,
                ) && (
                    <HistoryItem
                        title={
                            ticket?.status === statusEnum.COMPLETED
                                ? 'Работа завершена'
                                : 'Задача отклонена'
                        }
                        dateTime={ticket?.updatedAt}
                    />
                )}
            </div>
        </div>
    );
};
