import React, { useMemo, useState } from 'react';
import { Page } from 'widgets/Page/Page'
import { statusEnum, TicketsFilters } from 'features/tickets/ui/TicketsFilters';
import TicketsList from 'features/tickets/ui/TicketsList/TicketsList'
import { ticketsApi } from 'features/tickets/model/api/ticketsApi'

const AllTicketsPage = () => {
    //todo фильтрация и пагинация
    const [filters, setFilters] = useState<any>()
    const [pagination, setPagination] = useState({ limit: 3, page: 1 })

    const query = useMemo(() => {
        if (!filters || filters?.status === statusEnum.ALL) {
            return pagination
        }

        return {
            ...filters,
            ...pagination,
        }
    }, [filters, pagination])

    //todo есть поле count. пригодится в пагинации
    const { data } = ticketsApi.useGetTicketsListQuery(query)

    return (
        <Page>
            <TicketsFilters setFilters={setFilters} />
            <TicketsList tickets={data?.data} />
        </Page>
    );
};

export default AllTicketsPage;
