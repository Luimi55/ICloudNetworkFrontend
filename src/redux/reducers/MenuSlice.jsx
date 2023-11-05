import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mobileOpen: false
}

export const MenuSlice = createSlice({
    name: 'Menu',
    initialState,
    reducers:{
        handleDrawerToggle: (state) =>{
            state.mobileOpen = !state.mobileOpen
        },
    }
})

export const {
    handleDrawerToggle,
} = MenuSlice.actions

export default MenuSlice.reducer