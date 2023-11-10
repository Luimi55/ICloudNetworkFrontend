import React, {useState, useEffect} from 'react'
import {
  Button,
} from '@mui/material';
import Header from '../../components/Header'
import Styles from '../../styles/EmployeeReport.module.css'

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
    PDFDownloadLink 
  } from '@react-pdf/renderer';

const EmployeeReport = () => {

    const employeeReportList = useSelector((state)=>state.EmployeeReport.employeeReportList)

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
        <PDFDownloadLink document={<EmployeeCostReport/>} fileName='ex.pdf'>
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

        
      </div>
          

            
        <DataGrid
        rows={employeeReportList}
        columns={col}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />


    </div>
  )
}

export default EmployeeReport