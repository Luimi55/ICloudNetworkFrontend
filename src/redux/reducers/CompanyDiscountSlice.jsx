import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    companyDiscount: 0.115
}

export const CompanyDiscountSlice = createSlice({
    name: 'CompanyDiscount',
    initialState,
    reducers:{
        addCompanyDiscount: (state, action) =>{
            state.companyDiscount = action.payload.companyDiscount
        },
    }
})

export const {
    addCompanyDiscount,
} = CompanyDiscountSlice.actions

export default CompanyDiscountSlice.reducer