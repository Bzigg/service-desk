import React, { useMemo, useState } from 'react'
import { Page } from 'widgets/Page/Page'
import { Pagination } from 'widgets/Pagination'
import { statusEnum, TicketsFilters } from 'features/tickets/ui/TicketsFilters'
import TicketsList from 'features/tickets/ui/TicketsList/TicketsList'
import { ticketsApi } from 'features/tickets/model/api/ticketsApi'

const LIMIT = 3
const DEFAULT_PAGE = 1
//todo мб пагинацию в хук или хелпер

const AllTicketsPage = () => {
    const [filters, setFilters] = useState<any>()
    const [page, setPage] = useState(DEFAULT_PAGE)

    const query = useMemo(() => {
        if (!filters || filters?.status === statusEnum.ALL) {
            return {
                limit: LIMIT,
                page,
            }
        }

        return {
            ...filters,
            limit: LIMIT,
            page,
        }
    }, [filters, page])

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
