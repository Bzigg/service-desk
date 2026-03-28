import React, { FC } from 'react';
import { TicketItem } from 'entities/Ticket';
import cls from './TicketsList.module.scss';
import { Empty } from 'shared/ui/Empty/Empty';

interface IProps {
    tickets: any[];
}

const TicketsList: FC<IProps> = ({ tickets }) => {
    if (!tickets?.length) {
        return <Empty description="Вы еще не приняли ни одной заявки" />;
    }

    return (
        <div className={cls.WrapperList}>
            {tickets?.map((ticketItem) => {
                return <TicketItem key={ticketItem.id} ticket={ticketItem} />;
            })}
        </div>
    );
};

export default TicketsList;
