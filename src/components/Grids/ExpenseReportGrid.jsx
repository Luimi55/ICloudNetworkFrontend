import React from 'react'
  import {
    DataGrid,
    GridActionsCellItem,
  } from '@mui/x-data-grid';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/DeleteOutlined';

const ExpenseReportGrid = ({expenseReport}) => {
    const col = [
      { field: 'expenseDate', headerName: 'Expense date',  width: 200},
      { field: 'fuelOrTransport', headerName: 'Fuel or transport',  width: 125},
      { field: 'milla', headerName: 'Milla',  width: 125},
      { field: 'others', headerName: 'Others',  width: 125},
      { field: 'overnightFood', headerName: 'Overnight food',  width: 125},
      { field: 'parking', headerName: 'Parking',  width: 125},
      { field: 'toll', headerName: 'Toll',  width: 125},
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 150,
        cellClassName: 'actions',
        getActions: ({ id }) => {
  
          return [
            <GridActionsCellItem
              icon={<EditIcon/>}
              label="Edit"
              className="textPrimary"
            //   onClick={()=>handleEdit(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
            //   onClick={()=>handleDelete(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];

    const initialState = {
      pagination: {
          paginationModel: { page: 0, pageSize: 5 },
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
            rows={expenseReport}
            columns={col}
            initialState={initialState}
            // autoHeight = {true}
            pageSizeOptions={[5]}
        />
    </div>
  )
}

export default ExpenseReportGrid