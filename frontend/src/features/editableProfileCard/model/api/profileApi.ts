import { rtkApi } from 'shared/api/rtkApi'

export const profileApi = rtkApi
	.injectEndpoints({
		endpoints: (build) => ({
			getUserData: build.query<any, string>({
				query: (arg) => ({
					url: '/user/data',
					method: 'GET',
					params: {
						id: arg
					}
				}),
			}),
		}),
	});
