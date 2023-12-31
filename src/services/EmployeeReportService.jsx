import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";

const EmployeeReportService = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const COOKIE = import.meta.env.VITE_SECRET_COOKIE

    const  AddEmployeeReport = async (employeeReport) => {
        const user = jwtDecode(Cookies.get(COOKIE));

        return await axios({
            method: 'post',
            url: `${API_URL}/EmployeeReport/AddEmployeeReport`,
            data:{
                orderId: employeeReport.orderId,
                cost: employeeReport.cost,
                hours: employeeReport.hours,
                reportDate: new Date(),
                materials: employeeReport.materials,
                parking: employeeReport.parking,
                toll: employeeReport.toll,
                milla: employeeReport.milla,
                others: employeeReport.others,
                userId: user.sub
            }
        })
    }

    const GetEmployeeReport = async () => {
        const user = jwtDecode(Cookies.get(COOKIE));

        return await axios({
            method: 'get',
            url: `${API_URL}/EmployeeReport/GetAllEmployeeReport?userId=${user.sub}`
        })
    }


    return{
        AddEmployeeReport,
        GetEmployeeReport
    }
}

export default EmployeeReportService