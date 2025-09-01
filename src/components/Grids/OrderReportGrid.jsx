import React, {useState} from 'react'
  import {
    DataGrid,
    GridActionsCellItem,
  } from '@mui/x-data-grid';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/DeleteOutlined';
  import Swal from 'sweetalert2';

const OrderReportGrid = ({orderReport, handleDelete, handleEdit}) => {
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
              onClick={()=>handleEdit(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={()=>handleDelete(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];

    const initialState = {
      pagination: {
          paginationModel: { page: 0, pageSize: 7 },
      },
      sorting: {
        sortModel: [
          { field: 'orderDate', sort: 'desc' },
        ],
      },
    };


  return (
    <div>
        <DataGrid
            getRowId={(row) => row.id}
            rows={orderReport}
            columns={col}
            initialState={initialState}
            // autoHeight = {true}
            pageSizeOptions={[7, 12]}
        />
    </div>
  )
}

export default OrderReportGrid