import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const useAuth = () => {
    const COOKIE = import.meta.env.VITE_SECRET_COOKIE

    const saveCookie = (cookie) =>{
        Cookies.set(COOKIE, cookie.token, { expires: cookie.expires })
    }

    const dropCookie = () =>{

    }

    const isAuthenticated = () => {
        const isAuth = Cookies.get(COOKIE)? true : false;
        return isAuth
    }

    return {
        saveCookie,
        dropCookie,
        isAuthenticated
    }
    
}

export default useAuth