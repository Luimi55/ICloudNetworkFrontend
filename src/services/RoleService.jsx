import React from 'react'
import axios from 'axios'

const RoleService = () => {
    const API_URL = import.meta.env.VITE_API_URL

    const  GetRoles = async () => {
        return await axios({
            method: 'get',
            url: `${API_URL}/Role/GetAllBasicRoles`
        })
    }


    return{
        GetRoles
    }
}

export default RoleService