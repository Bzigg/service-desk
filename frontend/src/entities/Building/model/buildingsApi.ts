import { rtkApi } from 'shared/api/rtkApi'

export const buildingsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getBuilding: build.query<any, string>({
            query: (id) => ({
                url: `/buildings`,
                method: 'GET',
                params: { id },
            }),
        }),
        getBuildings: build.query<any, void>({
            query: () => ({
                url: `/buildings/all`,
                method: 'GET',
            }),
        }),
        //todo обновлять список при добавлении
        addBuilding: build.mutation<any, void>({
            query: (args) => ({
                url: `/buildings/add`,
                method: 'POST',
                body: args
            }),
        }),
    })
})
