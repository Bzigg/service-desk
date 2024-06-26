import { rtkApi } from 'shared/api/rtkApi';

export const ticketsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getTicketsList: build.query<any, any>({
			query: () => ({
				url: '/tickets',
				method: 'GET',
				params: {},
			}),
		}),
	}),
});
