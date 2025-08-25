import React from 'react'
import axios from 'axios'
import useAuth from '../hooks/auth/useAuth';

const UserService = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const {getCookie} = useAuth();

    const  SignUp = async (user) =>{
        return await axios({
            method: 'post',
            url: `${API_URL}/User/SignUp`,
            data: {
                FirstName: user.firstName,
                LastName: user.lastName,
                Email: user.email,
                Password: user.password,
            },
        })
    }

    const LogIn = async (user) => {
        return await axios({
            method: 'post',
            url: `${API_URL}/User/LogIn`,
            data: {
                email: user.email,
                password: user.password
            }
        })
    }

    const UserInfo = async () => {
        return await axios({
            method: 'get',
            headers: {
                'Authorization': `Bearer ${getCookie()}`
            },
            url: `${API_URL}/User/UserInfo`,
        })
    }

    const GetUsersByRole = async (roleId) => {
        return await axios({
            method: 'get',
            headers: {
                'Authorization': `Bearer ${getCookie()}`
            },
            url: `${API_URL}/User/GetUsersByRole?roleId=`+roleId,
        })
    }

    return {
        SignUp,
        LogIn,
        UserInfo,
        GetUsersByRole
      }

}

export default UserService