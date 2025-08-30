import React, {useState, useEffect} from 'react'
import {
  Button,
  Alert,
  Snackbar
} from '@mui/material';
import Header from '../../components/Header'
import Styles from '../../styles/General.module.css'

  import {
    DataGrid,
    GridActionsCellItem,
  } from '@mui/x-data-grid';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/DeleteOutlined';
  import { Link } from 'react-router-dom';
  import LinkApp from '../../components/LinkApp';
  import { useSelector } from 'react-redux';
  import EmployeeCostReport from '../../reports/EmployeeCostReport';
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

const OrderReport = () => {

    const {id} = useParams();

    const [orderReport,setOrderReport] = useState([])

    const [showLoading, setShowLoading] = useState(false);

    const [openMobileAlert, setOpenMobileAlert] = useState(false)

    const orderReportService = EmployeeReportService();

    const navigate = useNavigate();

    const mobile = useMobile();

      const formattedOrderReport=(orderReport)=>{
      const updatedOrders = orderReport.map(order => {
      const date = new Date(order.orderDate);
      return {
        ...order,
        orderDate: date.toISOString().split("T")[0] // keep only YYYY-MM-DD
      };
      });
      return updatedOrders;
    }

    useEffect(()=>{
      setShowLoading(true)
      orderReportService.GetOrderReport(id)
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
    },[])



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

    const handleDeleteClick = (id) => {
      //Local
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to remove this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          let employeeReports = JSON.parse(localStorage.getItem('employeeReports'));
          employeeReports = employeeReports.filter(empRep=>empRep.orderId!=id)
          localStorage.setItem('employeeReports', JSON.stringify(employeeReports))
          setEmployeeReportList(employeeReports)
          Swal.fire({
            title: "Deleted!",
            text: "Report has been deleted.",
            icon: "success"
          });
        }
      });

    }

    const handleEditClick = (id) => {
      //Local
      // let employeeReports = JSON.parse(localStorage.getItem('employeeReports'));
      // employeeReports = employeeReports.filter(empRep=>empRep.orderId!=id)
      // localStorage.setItem('employeeReports', JSON.stringify(employeeReports))
      // setEmployeeReportList(employeeReports)
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

      <Header name="Employee Report"/>  

      <div style={{
        width:"60%",
        margin: "auto",
        justifyContent: 'space-between',
        //gap: 10,
        display: 'flex'
      }}>
        <LinkApp to={`/orderReport/create/${id}`} color="white">
          <Button
            variant="contained"
            color="confirm"
            sx={{
              marginBottom: "1%",
              //justifyContent: 'space-between'
            }}
            //onClick={()=>addReport()}
          >
              Add Report
          </Button>     
        
        </LinkApp>
        {/* <PDFDownloadLink document={<EmployeeCostReport employeeReportList={employeeReportList}/>} fileName='ex.pdf'>
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
        </PDFDownloadLink> */}

        {/* <LinkApp to={mobile.isMobile?"":"/orderReport/report"} color="white" onClick={()=>reportValidation()}>
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
        </LinkApp> */}


      </div>
          
      <div
          style={{
              width:"60%",
              margin: "auto",
          }}        
      >
        <OrderReportGrid orderReport={orderReport}/>
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