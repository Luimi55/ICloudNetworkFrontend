import React, {useState, useEffect} from 'react'
import Styles from '../../styles/General.module.css'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom';
import Helper from '../../hooks/Helper';
import ExpenseReportService from '../../services/ExpenseReportService';
import Loading from '../../components/loading';
import errorAlert from '../../components/Alerts/ErrorAlert';
import ExpenseReportGrid from '../../components/Grids/ExpenseReportGrid';

const ExpenseReport = () => {
    const {id} = useParams();

    const [showLoading, setShowLoading] = useState(false);
    
    const [expenseReport,setExpenseReport] = useState([])

    const {getWeekRange} = Helper()

    const [startDate, setStartDate] = useState(getWeekRange().startDate)

    const [endDate, setEndDate] = useState(getWeekRange().endDate)

    const expenseReportService = ExpenseReportService();
    
    useEffect(()=>{
        getExpenseReport(startDate , endDate)
    },[])

    const getExpenseReport = (startDate, endDate) => {

      const data = {
        userId: id,
        startDate: startDate,
        endDate: endDate
      }

      setShowLoading(true)
      expenseReportService.GetExpenseReport(data)
        .then(res=>{
          setShowLoading(false)
          setExpenseReport(res.data)
        })
        .catch(err=>{
            errorAlert(err)
            setShowLoading(false)
            console.log(err)
        })
    }


  return (
    <div 
        className={Styles.screenBody}
    >
        <div 
            style={{
            width:"73%",
            margin: "auto"
            }}
        >
            <Header name="Expense Report"/>  
          <div
              style={{
                  // width:"60%",
                  margin: "auto",
              }}        
          >
            <ExpenseReportGrid expenseReport={expenseReport}/>
          </div>
      </div>
      <Loading show={showLoading}/>
    </div>
  )
}

export default ExpenseReport