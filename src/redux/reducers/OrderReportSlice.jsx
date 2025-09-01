import { createSlice,current } from '@reduxjs/toolkit'

const initialState = {
    orderReportCache:{}
}

export const OrderReportSlice = createSlice({
    name: 'EmployeeReport',
    initialState,
    reducers:{  
        setOrderReportCache: (state, action) =>{
            state.orderReportCache = action.payload
        },
    }
})

export const {
    setOrderReportCache,
} = OrderReportSlice.actions

export default OrderReportSlice.reducer