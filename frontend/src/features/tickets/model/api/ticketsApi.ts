import { rtkApi } from 'shared/api/rtkApi';

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
				providesTags: ['Ticket'],
			}),
			getMyTicketsList: build.query<any, any>({
				query: (arg) => ({
					url: '/tickets/my',
					method: 'GET',
					params: arg,
				}),
				providesTags: ['Ticket'],
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
				invalidatesTags: ['Ticket'],
			}),
		}),
	});
