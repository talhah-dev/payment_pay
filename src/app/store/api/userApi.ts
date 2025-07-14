import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ProfileProps {
    name: string
    email: string
    profileImage: string
    role: string
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getProfile: builder.query<ProfileProps, void>({
            query: () => 'user/profile',
            transformResponse: (response: { profile: ProfileProps }) => response.profile,
        }),
    }),
})

export const { useGetProfileQuery } = userApi
