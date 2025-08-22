import React from 'react'
import axios from 'axios'

const UserService = () => {
    const API_URL = import.meta.env.VITE_API_URL

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

    return {
        SignUp,
        LogIn
      }

}

export default UserService