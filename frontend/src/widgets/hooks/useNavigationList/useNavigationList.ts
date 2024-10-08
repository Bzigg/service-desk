import { useMemo, useState } from 'react'
import { statusEnum } from 'features/tickets/ui/TicketsFilters'

export const LIMIT = 3
export const DEFAULT_PAGE = 1

export const useNavigationList = () => {
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

    return {
        setFilters,
        page,
        setPage,
        query
    }
}
