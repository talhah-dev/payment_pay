import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/auth' }),
    endpoints: (builder) => ({
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'logout',
                method: 'GET',
            }),
        }),
    }),
})

export const { useLogoutMutation } = authApi
