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
  import EmployeeReportService from '../../services/EmployeeReportService';
  import useMobile from '../../hooks/useMobile';

const EmployeeReport = () => {

    const [employeeReportList,setEmployeeReportList] = useState([])

    const [openMobileAlert, setOpenMobileAlert] = useState(false)

    const employeeReportService = EmployeeReportService();

    const mobile = useMobile();

    useEffect(()=>{
      //local
       let localStorageEmployeeReports = localStorage.getItem('employeeReports');
      // if(localStorageEmployeeReports == ""){
      //   localStorageEmployeeReports = "[]"
      //   localStorage.setItem('employeeReports',localStorageEmployeeReports)
      // }
      const employeeReports = JSON.parse(localStorageEmployeeReports);
      if(employeeReports){
        setEmployeeReportList(employeeReports)
      }

      // employeeReportService.GetEmployeeReport() Backend
      //   .then(res=>{
      //     setEmployeeReportList(res.data)
      //   })
      //   .catch(err=>{
      //     console.log(res)
      //   })
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
      let employeeReports = JSON.parse(localStorage.getItem('employeeReports'));
      employeeReports = employeeReports.filter(empRep=>empRep.orderId!=id)
      localStorage.setItem('employeeReports', JSON.stringify(employeeReports))
      setEmployeeReportList(employeeReports)
    }

    const getBaseUrl = () => {
      return location.protocol + '//' + location.host;
    }
    const col = [
      { field: 'orderId', headerName: 'Order Id'},
      { field: 'reportDate', headerName: 'Date'},
      { field: 'cost', headerName: 'Cost per hour'},
      { field: 'hours', headerName: 'Hours'},
      { field: 'materials', headerName: 'Materials'},
      { field: 'parking', headerName: 'Parking'},
      { field: 'toll', headerName: 'TOLL'},
      { field: 'milla', headerName: 'Milla'},
      { field: 'others', headerName: 'Others'},
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
  
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={()=>handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];
      
    
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
        // backgroundColor: 'red',
        justifyContent: 'space-between',
        //gap: 10,
        display: 'flex'
      }}>
        <LinkApp to={"/employeeReport/create"} color="white">
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

        <LinkApp to={mobile.isMobile?"":"/employeeReport/report"} color="white" onClick={()=>reportValidation()}>
          <Button
              variant="contained"
              color="confirm"
              sx={{
                marginBottom: "1%",
                color:'white'
              }}
              // onClick={()=> window.open(`${getBaseUrl()}/employeeReport/report`, "_blank", 'noopener,noreferrer')}
              //onClick={}
            >
                Generate report
            </Button> 
        </LinkApp>


      </div>
          

        <DataGrid
        getRowId={(row) => row.orderId}
        rows={employeeReportList}
        columns={col}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        autoHeight = {true}
        pageSizeOptions={[5, 10]}
        />


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

    </div>
  )
}

export default EmployeeReport