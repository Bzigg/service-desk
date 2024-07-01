import React, { useState } from 'react';
import { Page } from 'widgets/Page/Page';
import { ticketsApi } from 'features/tickets/api/ticketsApi';
import TicketsList from 'features/TicketsList/TicketsList'
import TicketsFilters from 'features/TicketsFilters/TicketsFilters'

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
