import { rtkApi } from 'shared/api/rtkApi'

export const assignApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		assignTicket: build.mutation<any, any>({
			query: (arg) => ({
				url: '/tickets/assign',
				method: 'POST',
				// todo разобраться с data
				body: arg,
			}),
		}),
	}),
})
