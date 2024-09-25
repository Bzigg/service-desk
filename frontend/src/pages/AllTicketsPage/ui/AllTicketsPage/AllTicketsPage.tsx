import React, { useState } from 'react';
import { Page } from 'widgets/Page/Page';
import { TicketsFilters } from 'features/tickets/ui/TicketsFilters'
import TicketsList from 'features/tickets/ui/TicketsList/TicketsList';
import { ticketsApi } from 'features/tickets/model/api/ticketsApi';

const AllTicketsPage = () => {
    //todo фильтрация и пагинация
    const [filters, setFilters] = useState({})
    const [pagination, setPagination] = useState({ limit: 3, page: 1 })

    //todo есть поле count. пригодится в пагинации
    const { data } = ticketsApi.useGetTicketsListQuery({ ...filters, ...pagination })

    return (
        <Page>
            <TicketsFilters setFilters={setFilters} />
            <TicketsList tickets={data?.data} />
        </Page>
    );
};

export default AllTicketsPage;
