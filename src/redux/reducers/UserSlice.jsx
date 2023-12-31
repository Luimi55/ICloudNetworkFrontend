import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id:'',
    firstName: '',
    lastName: '',
    email: '',
    userRoleId: '',
    active: '',
    token: ''
}

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers:{
        setUser: (state, action) =>{
            state.id = action.payload.id
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.email = action.payload.email
            state.userRoleId = action.payload.userRoleId
            state.active = action.payload.active
            state.token = action.payload.token
        },
    }
})

export const {
    setUser,
} = UserSlice.actions

export default UserSlice.reducer