import React from 'react'
import { Page } from 'widgets/Page/Page'
import { ticketsApi } from 'features/tickets/model/api/ticketsApi'
import TicketsList from 'features/tickets/ui/TicketsList/TicketsList'
import { TicketsFilters } from 'features/tickets/ui/TicketsFilters'
import { LIMIT, useNavigationList } from 'widgets/hooks/useNavigationList/useNavigationList'
import { Pagination } from 'widgets/Pagination'

const MyTicketsPage = () => {
    const { setFilters, page, setPage, query } = useNavigationList()

    const { data } = ticketsApi.useGetMyTicketsListQuery(query)

    return (
        <Page>
            <TicketsFilters setFilters={setFilters} />
            <TicketsList tickets={data?.data} />
            {data?.total > LIMIT && (
                <Pagination
                    limit={LIMIT}
                    count={data.total}
                    currentPage={page}
                    setCurrentPage={setPage}
                />
            )}
        </Page>
    );
};

export default MyTicketsPage;
