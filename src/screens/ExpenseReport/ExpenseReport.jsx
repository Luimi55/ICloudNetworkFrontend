import React, {useState, useEffect} from 'react'
import Styles from '../../styles/General.module.css'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom';
import Helper from '../../hooks/Helper';
import ExpenseReportService from '../../services/ExpenseReportService';
import Loading from '../../components/loading';
import errorAlert from '../../components/Alerts/ErrorAlert';
import ExpenseReportGrid from '../../components/Grids/ExpenseReportGrid';
import RangeDatePicker from '../../components/Forms/RangeDatePicker';
  import LinkApp from '../../components/LinkApp';
  import {
  Button,
} from '@mui/material';

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


    const onChangeStartDate = (value)=>{
      setStartDate(value.$d)
    }

    const onChangeEndDate = (value)=>{
      setEndDate(value.$d)
    }

    const onClickApply = () => {
      getExpenseReport(startDate, endDate)
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
              <RangeDatePicker 
              onChangeStartDate={onChangeStartDate} 
              onChangeEndDate={onChangeEndDate}
              defaultValueStartDate={startDate}
              defaultValueEndDate={endDate}
              onClickButton={onClickApply}
              />

            <LinkApp to={`/expenseReport/create/${id}`} color="white">
              <Button
                variant="contained"
                color="confirm"
                sx={{
                  marginBottom: "1%",
                }}
              >
                  Add Report
              </Button>     
            </LinkApp>

            <ExpenseReportGrid expenseReport={expenseReport}/>
          </div>
      </div>
      <Loading show={showLoading}/>
    </div>
  )
}

export default ExpenseReport