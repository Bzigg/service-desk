import React, { useState } from 'react';
import { Page } from 'widgets/Page/Page';
import { TicketsFilters } from 'features/tickets/ui/TicketsFilters'
import TicketsList from 'features/tickets/ui/TicketsList/TicketsList';
import { ticketsApi } from 'features/tickets/model/api/ticketsApi';

const AllTicketsPage = () => {
    const [filters, setFilters] = useState()
    const { data } = ticketsApi.useGetTicketsListQuery(filters)

    return (
        <Page>
            <TicketsFilters setFilters={setFilters} />
            <TicketsList tickets={data} />
        </Page>
    );
};

export default AllTicketsPage;
