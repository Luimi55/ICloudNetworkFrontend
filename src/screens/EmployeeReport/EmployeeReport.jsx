import React, {useState, useEffect} from 'react'
import {
  Button,
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

const EmployeeReport = () => {

    const employeeReportList = useSelector((state)=>state.EmployeeReport.employeeReportList)
    console.log(employeeReportList)
    const getBaseUrl = () => {
      return location.protocol + '//' + location.host;
    }
    const col = [
      { field: 'id', headerName: 'Id'},
      { field: 'date', headerName: 'Date'},
      { field: 'orderId', headerName: 'Order Id'},
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
              //onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              //onClick={handleDeleteClick(id)}
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

        <LinkApp to={"/employeeReport/report"} color="white">
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
      </div>

      {/* <PDFViewer style={{width: "100%", height: "90vh"}}>
        <EmployeeCostReport employeeReportList={employeeReportList}/>
        </PDFViewer> */}
    </div>
  )
}

export default EmployeeReport