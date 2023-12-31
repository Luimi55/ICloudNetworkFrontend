import React from 'react'
import axios from 'axios'

const UserService = () => {
    const API_URL = import.meta.env.VITE_API_URL

    const  SignUp = async (user) =>{
        await axios({
            method: 'post',
            url: `${API_URL}/Auth/SignUp`,
            data: {
                FirstName: user.firstName,
                LastName: user.lastName,
                Email: user.email,
                Password: user.password,
                UserRoleId: user.role,
                Active: true
            },
            //timeout: 1000
        })
        .then( (response) => {
            //console.log(response)
        }) 
        .catch( (error) => {
            //console.log(error);
        });
    }

    const LogIn = async (user) => {
        return await axios({
            method: 'post',
            url: `${API_URL}/Auth/LogIn`,
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