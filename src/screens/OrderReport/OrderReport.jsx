import React, {useState, useEffect} from 'react'
import {
  Button,
  Alert,
  Snackbar
} from '@mui/material';
import Header from '../../components/Header'
import Styles from '../../styles/General.module.css'
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/DeleteOutlined';
  import { Link } from 'react-router-dom';
  import LinkApp from '../../components/LinkApp';
import {useSelector, useDispatch } from 'react-redux'
  import { 
    PDFDownloadLink ,
    PDFViewer
  } from '@react-pdf/renderer';
  import EmployeeReportService from '../../services/OrderReportService';
  import useMobile from '../../hooks/useMobile';
  import { useNavigate } from "react-router-dom";
  import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loading from '../../components/loading';
import errorAlert from '../../components/Alerts/ErrorAlert';
import OrderReportGrid from '../../components/Grids/OrderReportGrid';
import RangeDatePicker from '../../components/RangeDatePicker';
import Helper from '../../hooks/Helper';
import DeleteAlert from '../../components/Alerts/DeleteAlert';
import {setOrderReportCache} from '../../redux/reducers/OrderReportSlice'

const OrderReport = () => {

    const {id} = useParams();

    const [orderReport,setOrderReport] = useState([])

    const {getWeekRange} = Helper()

    const [showLoading, setShowLoading] = useState(false);

    const [openMobileAlert, setOpenMobileAlert] = useState(false)

    const orderReportService = EmployeeReportService();

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const mobile = useMobile();

    const [startDate, setStartDate] = useState(getWeekRange().startDate)

    const [endDate, setEndDate] = useState(getWeekRange().endDate)


      const formattedOrderReport=(orderReport)=>{
        const updatedOrders = orderReport.map(order => {
          const date = order.orderDate
          return {
            ...order,
            orderDate: date.split("T")[0], // keep only YYYY-MM-DD
          };
        });
      return updatedOrders;
    }

    useEffect(()=>{
      getOrderReport(startDate , endDate)
    },[])


    const getOrderReport = (startDate, endDate) => {

      const data = {
        userId: id,
        startDate: startDate,
        endDate: endDate
      }

      setShowLoading(true)
      orderReportService.GetOrderReport(data)
        .then(res=>{
          setShowLoading(false)
          const formattedOrders = formattedOrderReport(res.data)
          setOrderReport(formattedOrders)
        })
        .catch(err=>{
            errorAlert(err)
            setShowLoading(false)
            console.log(err)
        })
    }



    const reportValidation = () => {

      const isMobile = mobile.isMobile;
      if(isMobile){
        setOpenMobileAlert(true)
      }
      
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenMobileAlert(false);
    };


    const onChangeStartDate = (value)=>{
      setStartDate(value.$d)
    }

    const onChangeEndDate = (value)=>{
      setEndDate(value.$d)
    }

    const onClickApply = () => {
      getOrderReport(startDate, endDate)
    }

    const handleDelete = (id) => {
        DeleteAlert(()=>deleteOrderReport(id))
    }

    const deleteOrderReport =  async (id) => {
      setShowLoading(true)
      orderReportService.DeleteOrderReport(id)
        .then(res=>{
          setShowLoading(false)
          const reportsFilted = orderReport.filter(report=>report.id!=id)
          setOrderReport(reportsFilted)
            Swal.fire({
              title: "Deleted!",
              text: "Order report has been deleted.",
              icon: "success"
            });
        })
        .catch(err=>{
            errorAlert(err)
            setShowLoading(false)
            console.log(err)
        })
    }

    const handleEdit = (reportId) => {
      const selectedReport = orderReport.find(report=>report.id == reportId);
      dispatch(setOrderReportCache(selectedReport))
      navigate(`/orderReport/update/${id}`)
    }

    const getBaseUrl = () => {
      return location.protocol + '//' + location.host;
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

      <Header name="Order Report"/>  

      {/* <div style={{
        width:"60%",
        margin: "auto",
        justifyContent: 'space-between',
        //gap: 10,
        display: 'flex'
      }}>

        <PDFDownloadLink document={<EmployeeCostReport employeeReportList={employeeReportList}/>} fileName='ex.pdf'>
          <Button
              variant="contained"
              color="confirm"
              sx={{
                marginBottom: "1%",
                color:'white'
              }}
              //onClick={}
            >
                Generate report
            </Button> 
        </PDFDownloadLink>

        <LinkApp to={mobile.isMobile?"":"/orderReport/report"} color="white" onClick={()=>reportValidation()}>
          <Button
              variant="contained"
              color="confirm"
              sx={{
                marginBottom: "1%",
                color:'white'
              }}
            >
                Generate report
            </Button> 
        </LinkApp>


      </div> */}
          
      <div
          style={{
              width:"60%",
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

        <LinkApp to={`/orderReport/create/${id}`} color="white">
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


        <OrderReportGrid orderReport={orderReport} handleDelete={handleDelete} handleEdit={handleEdit}/>
        
      </div>

      <Snackbar
        open={openMobileAlert}
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
        autoHideDuration={4000}
        onClose={handleClose}
        >
        <Alert
          severity="warning"
          sx={{ width: '100%' }}
        >
          Not available in mobile
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error Alert.</Alert> */}
      </div>

      {/* <PDFViewer style={{width: "100%", height: "90vh"}}>
        <EmployeeCostReport employeeReportList={employeeReportList}/>
        </PDFViewer> */}
    <Loading show={showLoading}/>
    </div>
  )
}

export default OrderReport