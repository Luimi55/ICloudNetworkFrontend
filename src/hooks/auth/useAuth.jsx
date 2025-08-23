import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const useAuth = () => {
    const COOKIE = import.meta.env.VITE_SECRET_COOKIE

    const saveCookie = (cookie) =>{
        Cookies.set(COOKIE, cookie.token, { expires: cookie.expires })
    }

    const getCookie = () =>{
        return Cookies.get(COOKIE)
    }

    const dropCookie = () =>{
        Cookies.remove(COOKIE)
    }

    const isAuthenticated = () => {
        const isAuth = Cookies.get(COOKIE)? true : false;
        return isAuth
    }

    return {
        saveCookie,
        getCookie,
        dropCookie,
        isAuthenticated
    }
    
}

export default useAuth