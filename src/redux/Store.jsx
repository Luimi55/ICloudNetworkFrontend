import { configureStore } from '@reduxjs/toolkit';
import MenuSlice from '../redux/reducers/MenuSlice'
import EmployeeReportSlice from './reducers/EmployeeReportSlice';

export const Store = configureStore({
    reducer: {
        Menu: MenuSlice,
        EmployeeReport: EmployeeReportSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});