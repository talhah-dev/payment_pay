import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface TeamMember {
    name: string
    email: string
    role: string
    profileImage: string
}

export const teamApi = createApi({
    reducerPath: 'teamApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getTeamMembers: builder.query<TeamMember[], void>({
            query: () => 'users',
            transformResponse: (response: { message: string; users: TeamMember[] }) => response.users,
        }),
    }),
})

// Export the auto-generated hook for your component
export const { useGetTeamMembersQuery } = teamApi
