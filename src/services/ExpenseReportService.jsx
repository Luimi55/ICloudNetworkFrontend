import React from 'react'
import axios from 'axios'
import useAuth from '../hooks/auth/useAuth';

const ExpenseReportService = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const {getCookie} = useAuth();

    const GetExpenseReport = async (data) => {
        return await axios({
            method: 'post',
            headers: {
                'Authorization': `Bearer ${getCookie()}`
            },
            url: `${API_URL}/ExpenseReport/GetExpenseReportByDateRange`,
            data: data
        })
    }
    
  return {
    GetExpenseReport
  }
}

export default ExpenseReportService