import React, {useState, useEffect} from 'react'
// import Box from '@mui/material/Box';
import {
  // Box,
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

const EmployeeReport = () => {

    const [orderId, setOrderId] = useState("");
    const [cost, setCost] = useState("");
    const [hours, setHours] = useState("");
    var id=1;



    const [data, setData] = useState([
    {
        id: 1,
        date: new Date().toLocaleDateString(),
        orderId: "#1234",
        orderDescription: "X",
        cost: "10",
        hours: "8",
        materials: "2",
        parking: "2",
        toll: "2",
        others: "2"
    },
    
    ])


    const col = [
      { field: 'id', headerName: 'Id'},
      { field: 'date', headerName: 'Date'},
      { field: 'orderId', headerName: 'Order Id'},
      { field: 'cost', headerName: 'Cost per hour'},
      { field: 'hours', headerName: 'Hours'},
      { field: 'materials', headerName: 'Materials'},
      { field: 'parking', headerName: 'Parking'},
      { field: 'toll', headerName: 'TOLL'},
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



      const addReport = () => {
        const newReport = {
          id: id+1,
          date: new Date().toLocaleDateString(),
          orderId: orderId,
          projectDescription: "",
          cost: cost,
          hours: hours
        }

        setData([...data, newReport])
      }
      
    
  return (
    <div 
    className={Styles.screenBody}
    >
      <Header name="Employee Report"/>  
          
      <Link to={"/employeeReport/create"}  style={{ textDecoration: 'none', color:'white' }}>

      <Button
        variant="contained"
        color="confirm"
        //onClick={()=>addReport()}
      >
          Add Report
      </Button>       
      </Link>

      {/* <Box
      sx={{
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        backgroundColor: 'white',
        marginTop: '10px'
      }}
    > */}

            
        <DataGrid
        rows={data}
        columns={col}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    {/* </Box> */}

    </div>
  )
}

export default EmployeeReport