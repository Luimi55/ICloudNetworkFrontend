import React from 'react'
import axios from 'axios'
import useAuth from '../hooks/auth/useAuth';

const OrderReportService = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const {getCookie} = useAuth();

    const  AddOrderReport = async (orderReport) => {

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


    const UpdateOrderReport = async (data) => {
        return await axios({
            method: 'put',
            headers: {
                'Authorization': `Bearer ${getCookie()}`
            },
            url: `${API_URL}/OrderReport/UpdateOrderReport`,
            data: data
        })
    }


    return{
        AddOrderReport,
        GetOrderReport,
        DeleteOrderReport,
        UpdateOrderReport
    }
}

export default OrderReportService