import { rtkApi } from 'shared/api/rtkApi';

const updateTicket = (arg: any) => {
	return (draft: any[]) => {
		draft.forEach((ticketItem) => {
			if (ticketItem.id === arg.ticketId) {
				Object.assign(ticketItem, { status: arg.status })
			}
		})
	}
}

export const ticketsApi = rtkApi
	.enhanceEndpoints({addTagTypes: ['Ticket']})
	.injectEndpoints({
		endpoints: (build) => ({
			createTicket: build.mutation<any, any>({
				query: (arg) => ({
					url: '/tickets/create',
					method: 'POST',
					body: arg,
				}),
			}),
			changeTicket: build.mutation<any, any>({
				query: (arg) => ({
					url: '/tickets/change',
					method: 'PUT',
					body: arg,
				}),
				invalidatesTags: ['Ticket'],
			}),
			getTicketsList: build.query<any, any>({
				query: (arg) => ({
					url: '/tickets/all',
					method: 'GET',
					params: arg,
				}),
			}),
			getMyTicketsList: build.query<any, any>({
				query: () => ({
					url: '/tickets/my',
					method: 'GET',
					params: {},
				}),
			}),
			getTicket: build.query<any, string>({
				query: (id) => ({
					url: `/tickets`,
					method: 'GET',
					params: { id },
				}),
				providesTags: ['Ticket'],
			}),
			changeStatus: build.mutation<any, any>({
				query: (arg) => ({
					url: `/tickets/status`,
					method: 'PATCH',
					body: arg
				}),
				async onQueryStarted(arg, { dispatch, queryFulfilled }) {
					//todo тикитсы лежат в дате
					const getTicketsListPatchResult = dispatch(
						ticketsApi.util.updateQueryData('getTicketsList', undefined, updateTicket(arg))
					)
					const getMyTicketsListPatchResult = dispatch(
						ticketsApi.util.updateQueryData('getMyTicketsList', undefined, updateTicket(arg))
					)
					try {
						await queryFulfilled
					} catch (e) {
						getTicketsListPatchResult.undo()
						getMyTicketsListPatchResult.undo()
					}
				},
				invalidatesTags: ['Ticket'],
			}),
		}),
	});
