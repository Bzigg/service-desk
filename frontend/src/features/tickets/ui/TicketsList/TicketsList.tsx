import React, { FC } from 'react';
import { TicketItem } from 'entities/Ticket';
import { Empty } from 'shared/ui/Empty/Empty';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface IProps {
    tickets: any[];
}

const TicketsList: FC<IProps> = ({ tickets }) => {
    if (!tickets?.length) {
        return <Empty description="Вы еще не приняли ни одной заявки" />;
    }

    return (
        <div className="mt8">
            {tickets?.map((ticketItem) => {
                return <TicketItem key={ticketItem.id} ticket={ticketItem} />;
            })}
        </div>
    );
};

export default TicketsList;
