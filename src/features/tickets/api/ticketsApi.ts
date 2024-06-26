import { rtkApi } from 'shared/api/rtkApi';

export const ticketsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getTicketsList: build.query<any, any>({
			query: () => ({
				url: '/tickets/all',
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
		}),
	}),
});
