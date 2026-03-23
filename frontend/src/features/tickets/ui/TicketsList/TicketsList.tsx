import React, { FC } from 'react';
import { TicketItem } from 'entities/Ticket';
import cls from './TicketsList.module.scss';

interface IProps {
    tickets: any[];
}

const TicketsList: FC<IProps> = ({ tickets }) => {
    return (
        <div className={cls.WrapperList}>
            {tickets?.map((ticketItem) => {
                return <TicketItem key={ticketItem.id} ticket={ticketItem} />;
            })}
        </div>
    );
};

export default TicketsList;
