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
        updateProfile: builder.mutation({
            query: (body: { profileImage: string }) => ({
                url: "user/profile",
                method: "PATCH",
                body,
            }),
        }),
    }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi
