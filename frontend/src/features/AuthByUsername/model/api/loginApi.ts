import { rtkApi } from 'shared/api/rtkApi';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export interface LoginRequest {
	email: string;
	password: string;
}

export const loginApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<User, LoginRequest>({
			query: (body) => ({
				url: 'auth/login',
				method: 'POST',
				body,
			}),
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data));
					dispatch(userActions.setAuthData(data));
				} catch {
					// ошибка обрабатывается в компоненте через unwrap
				}
			},
		}),
	}),
});

export const { useLoginMutation } = loginApi;
