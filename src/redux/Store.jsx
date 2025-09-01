import { configureStore } from '@reduxjs/toolkit';
import MenuSlice from '../redux/reducers/MenuSlice'
import OrderReportSlice from './reducers/OrderReportSlice';
import CompanyDiscountSlice from './reducers/CompanyDiscountSlice';
import UserSlice from './reducers/UserSlice'

export const Store = configureStore({
    reducer: {
        Menu: MenuSlice,
        OrderReport: OrderReportSlice,
        CompanyDiscount:CompanyDiscountSlice,
        User: UserSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});