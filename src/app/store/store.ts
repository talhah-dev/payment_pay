import { configureStore } from '@reduxjs/toolkit'
import { teamApi } from './api/teamApi'
import { userApi } from './api/userApi'
import { authApi } from './api/authApi'

export const store = configureStore({
    reducer: {
        [teamApi.reducerPath]: teamApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(teamApi.middleware, userApi.middleware, authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
