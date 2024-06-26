import React, { useState } from 'react';
import { Page } from 'widgets/Page/Page';
import TicketsFilters from '../TicketsFilters/TicketsFilters';
import TicketsList from '../TicketsList/TicketsList';
import { ticketsApi } from 'features/tickets/api/ticketsApi';

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
