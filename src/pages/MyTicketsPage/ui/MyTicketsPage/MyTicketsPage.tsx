import React, { useState } from 'react';
import { Page } from 'widgets/Page/Page';
import { ticketsApi } from 'features/tickets/model/api/ticketsApi';
import TicketsList from 'features/tickets/ui/TicketsList/TicketsList'
import { TicketsFilters } from 'features/tickets/ui/TicketsFilters'

const MyTicketsPage = () => {
    const [filters, setFilters] = useState()
    const { data } = ticketsApi.useGetMyTicketsListQuery(filters)

    return (
        <Page>
            <TicketsFilters setFilters={setFilters} />
            <TicketsList tickets={data} />
        </Page>
    );
};

export default MyTicketsPage;
