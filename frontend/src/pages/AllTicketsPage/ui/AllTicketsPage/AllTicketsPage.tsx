import React from 'react'
import { Page } from 'widgets/Page/Page'
import { Pagination } from 'widgets/Pagination'
import { TicketsFilters } from 'features/tickets/ui/TicketsFilters'
import TicketsList from 'features/tickets/ui/TicketsList/TicketsList'
import { ticketsApi } from 'features/tickets/model/api/ticketsApi'
import { LIMIT, useNavigationList } from 'widgets/hooks/useNavigationList/useNavigationList'

const AllTicketsPage = () => {
    const { setFilters, page, setPage, query } = useNavigationList()

    const { data } = ticketsApi.useGetTicketsListQuery(query)

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
    )
}

export default AllTicketsPage
