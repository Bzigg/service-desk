import { rtkApi } from 'shared/api/rtkApi'

export const registrationApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		registrationRequest: build.mutation<any, any>({
			query: (arg) => ({
				url: 'auth/registration',
				method: 'POST',
				body: arg,
			}),
		}),
	}),
});
