import { configureStore } from '@reduxjs/toolkit'
import animeSearchReducer from "@/store/animeSearchSlice";

export const store = configureStore({
    reducer: {
        animeSearch: animeSearchReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

