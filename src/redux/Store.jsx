import { configureStore } from '@reduxjs/toolkit';
import MenuSlice from '../redux/reducers/MenuSlice'

export const Store = configureStore({
    reducer: {
        Menu: MenuSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});