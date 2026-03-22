import { rtkApi } from 'shared/api/rtkApi';

export interface UserProfileData {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    surname: string;
    photo?: string | null;
    isUser?: boolean;
    isAdmin?: boolean;
}

export interface UpdateUserDataRequest {
    id: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    surname?: string;
    photo?: string;
}

export const profileApi = rtkApi
    .enhanceEndpoints({ addTagTypes: ['Profile'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getUserData: build.query<UserProfileData, string>({
                query: (id) => ({
                    url: '/users/data',
                    method: 'GET',
                    params: { id },
                }),
                providesTags: (_result, _error, id) => [
                    { type: 'Profile', id },
                ],
            }),
            updateUserData: build.mutation<
                UserProfileData | null,
                UpdateUserDataRequest
            >({
                query: (body) => ({
                    url: '/users/data',
                    method: 'PUT',
                    body,
                }),
                invalidatesTags: (_result, _error, arg) => [
                    { type: 'Profile', id: String(arg.id) },
                ],
            }),
            updateUserPhoto: build.mutation<
                UserProfileData | null,
                { id: number; file: File }
            >({
                query: ({ id, file }) => {
                    const formData = new FormData();
                    formData.append('photo', file);
                    formData.append('id', String(id));
                    return {
                        url: '/users/photo',
                        method: 'PUT',
                        body: formData,
                    };
                },
                invalidatesTags: (_result, _error, arg) => [
                    { type: 'Profile', id: String(arg.id) },
                ],
            }),
        }),
    });

export const {
    useGetUserDataQuery,
    useUpdateUserDataMutation,
    useUpdateUserPhotoMutation,
} = profileApi;
