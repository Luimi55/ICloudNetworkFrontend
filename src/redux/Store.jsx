import { configureStore } from '@reduxjs/toolkit';
import MenuSlice from '../redux/reducers/MenuSlice'
import EmployeeReportSlice from './reducers/EmployeeReportSlice';
import CompanyDiscountSlice from './reducers/CompanyDiscountSlice';

export const Store = configureStore({
    reducer: {
        Menu: MenuSlice,
        EmployeeReport: EmployeeReportSlice,
        CompanyDiscount:CompanyDiscountSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});