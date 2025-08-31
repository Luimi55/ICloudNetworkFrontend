import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";
import useAuth from '../hooks/auth/useAuth';

const OrderReportService = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const COOKIE = import.meta.env.VITE_SECRET_COOKIE
    const {getCookie} = useAuth();

    const  AddOrderReport = async (orderReport) => {
        const user = jwtDecode(Cookies.get(COOKIE));

        return await axios({
            method: 'post',
            url: `${API_URL}/OrderReport/AddOrderReport`,
            headers: {
                'Authorization': `Bearer ${getCookie()}`
            },
            data: orderReport
        })
    }

    const GetOrderReport = async (data) => {
        return await axios({
            method: 'post',
            headers: {
                'Authorization': `Bearer ${getCookie()}`
            },
            url: `${API_URL}/OrderReport/GetOrderReportByDateRange`,
            data: data
        })
    }

    const DeleteOrderReport = async (orderId) => {
        return await axios({
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${getCookie()}`
            },
            url: `${API_URL}/OrderReport/DeleteOrderReport?orderId=${orderId}`,
        })
    }


    return{
        AddOrderReport,
        GetOrderReport,
        DeleteOrderReport
    }
}

export default OrderReportService