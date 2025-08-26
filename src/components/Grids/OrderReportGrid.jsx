import React, {useState} from 'react'
  import {
    DataGrid,
    GridActionsCellItem,
  } from '@mui/x-data-grid';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/DeleteOutlined';

const OrderReportGrid = ({orderReport}) => {
    const col = [
      { field: 'orderId', headerName: 'Order Id',  width: 200},
      { field: 'hours', headerName: 'Hours',  width: 100},
      { field: 'orderDate', headerName: 'Order Date',  width: 250},
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
  
          return [
            <GridActionsCellItem
              icon={<EditIcon/>}
              label="Edit"
              className="textPrimary"
              onClick={()=>navigate(`/orderReport/update/${id}`)}
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
    <div>
        <DataGrid
            getRowId={(row) => row.orderId}
            rows={orderReport}
            columns={col}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 5 },
            },
            }}
            // autoHeight = {true}
            pageSizeOptions={[5, 10]}
        />
    </div>
  )
}

export default OrderReportGrid